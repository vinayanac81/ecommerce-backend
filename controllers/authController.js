import mongoose from "mongoose";
import adminModel from "../model/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import userModel from "../model/userModel.js";
import cartModel from "../model/cartModel.js";
import { OAuth2Client } from "google-auth-library";
const ObjectId = mongoose.Types.ObjectId;
export const adminLogin = async (req, res) => {
  try {
    //email : Vinayanac7777@gmail.com
    //password : Vinayanac
    const { email, password } = req.query.login;
    const user = await adminModel.findOne({ email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      console.log(isPasswordCorrect);
      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
            image: user.image,
          },
          process.env.JWT_SECRET ?? "vinayanac",
          { expiresIn: "1d" }
        );
        user.password = undefined;
        return res.json({
          success: true,
          token,
          admin: user,
          message: "Admin Login Successfully",
        });
      } else {
        return res.json({
          success: false,
          passError: true,
          message: "Password error",
        });
      }
    } else {
      return res.json({ success: false, message: "Admin not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
let signupInformation = {
  first_name: "",
  last_name: "",
  email: "",
  mobile: "",
  password: "",
  referral_code: "",
};
export const userSignup = async (req, res) => {
  try {
    const TwilioAuth = `${process.env.TWILIO_AUTH_TOKEN}`;
    const TwilioSid = `${process.env.TWILIO_ACCOUNT_SID}`;
    const serviceSid = `${process.env.TWILIO_SERVICE_SID}`;
    const client = twilio(TwilioSid, TwilioAuth);
    const { signupData } = req.query;
    let { first_name, last_name, email, password, mobile } = signupData;
    email = email.toLowerCase();
    const ifEmail = await userModel.findOne({ email: email });
    if (ifEmail) {
      return res.json({
        success: false,
        emailExist: true,
        message: "Email id already registered",
      });
    }
    // const ifNumber = await userModel.findOne({ mobile });

    // if (ifNumber) {
    //   return res.json({
    //     success: false,
    //     message: "Mobile Number Already Registered",
    //   });
    // }
    signupInformation.mobile = parseInt(mobile);
    signupInformation.first_name = first_name;
    signupInformation.last_name = last_name;
    signupInformation.email = email;
    signupInformation.password = password;
    signupInformation.mobile = mobile;
    client.verify.v2
      .services(serviceSid)
      .verifications.create({
        to: `+91${mobile}`,
        channel: "sms",
      })
      .then((resp) => {
        console.log(resp.sid);
        res.json({ success: true, message: "OTP Sented Successfully" });
      });
  } catch (error) {
    console.log(error);
  }
};
export const verifyOtp = async (req, res) => {
  try {
    const TwilioAuth = `${process.env.TWILIO_AUTH_TOKEN}`;
    const TwilioSid = `${process.env.TWILIO_ACCOUNT_SID}`;
    const serviceSid = `${process.env.TWILIO_SERVICE_SID}`;
    const client = twilio(TwilioSid, TwilioAuth);
    const { otp } = req.body;
    console.log(otp);
    client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({
        to: `+91${signupInformation.mobile}`,
        code: otp,
      })
      .then(async (resp) => {
        console.log(resp.status);
        console.log(resp.valid);
        if (resp.valid === true) {
          signupInformation.password = await bcrypt.hash(signupInformation.password, 12);
          function generateString(length) {
            const characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }

            return result;
          }
          let referral = generateString(16);
          await userModel.create({
            first_name: signupInformation.first_name,
            last_name: signupInformation.last_name,
            email: signupInformation.email,
            mobile: signupInformation.number,
            password: signupInformation.password,
            referral_code: referral,
            referrals: [],
            wallet: 0,
            block: false,
          });
          console.log("SUCCESS");
          res.json({ success: true, message: "Signup Successfull." });
        }
      })
      .catch((err) => {
        res.json({ message: "Something went wrong.", success: false, err });
      });
  } catch (error) {
    console.log(error);
  }
};
export const userLogin = async (req, res) => {
  try {
    const { loginData } = req.query;
    let { email, password } = loginData;
    email = email.toLowerCase();
    const user = await userModel.findOne({ email });
    if (user) {
      let correct = await bcrypt.compare(password, user.password);
      if (correct) {
        const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
            image: user.image,
            first_name: user.first_name,
            last_name: user.last_name,
            wallet: user.wallet,
            referral_code: user.referral_code,
            referrals: user.referrals,
          },
          process.env.JWT_SECRET ?? "vinayanac",
          { expiresIn: "1d" }
        );
        user.password = undefined;
        // console.log(user._id);
        let myObjectId = user._id;
        let myObjectIdString = myObjectId.toString();
        // console.log(myObjectIdString);
        const cart = await cartModel.findOne({ user_id: myObjectIdString });
        let cartCount;
        if (cart === null) {
          cartCount = 0;
        } else {
          cartCount = cart?.cart_count;
        }
        console.log(cart);
        return res.json({
          success: true,
          token,
          cart_count: cartCount,
          user,
          message: "Login Successfully",
        });
      } else {
        return res.json({ success: false, message: "Password wrong" });
      }
    } else {
      return res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
const client = new OAuth2Client(`${process.env.CLIENT_ID}`);
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    client
      .verifyIdToken({ idToken, requiredAudience: `${process.env.CLIENT_ID}` })
      .then((response) => {
        const {
          email_verified,
          picture,
          given_name,
          family_name,
          name,
          email,
        } = response.payload;
        console.log(response.payload);
        if (email_verified) {
          userModel.findOne({ email }).then(async (user) => {
            if (user) {
              const token = jwt.sign(
                {
                  _id: user._id,
                  email: user.email,
                  image: user.image,
                  first_name: user?.first_name,
                  last_name: user?.last_name,
                  wallet: user.wallet,
                  referral_code: user.referral_code,
                  referrals: user.referrals,
                },
                process.env.JWT_SECRET ?? "vinayanac",
                { expiresIn: "1d" }
              );
              // console.log(user._id);
              let myObjectId = user._id;
              let myObjectIdString = myObjectId.toString();
              // console.log(myObjectIdString);
              const cart = await cartModel.findOne({
                user_id: myObjectIdString,
              });
              let cartCount;
              if (cart === null) {
                cartCount = 0;
              } else {
                cartCount = cart?.cart_count;
              }
              // console.log(cart);
              return res.json({
                success: true,
                token,
                cart_count: cartCount,
                user,
                message: "Login Successfully",
              });
            } else {
              // program to generate random strings

              // declare all characters

              function generateString(length) {
                const characters =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let result = "";
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                  result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                  );
                }

                return result;
              }
              let referral = generateString(16);
              // console.log(referral);
              userModel
                .create({
                  first_name: given_name,
                  last_name: family_name,
                  email,
                  image: "",
                  wallet: 0,
                  referral_code: referral,
                  block: false,
                })
                .then(async (data) => {
                  console.log(data);
                  const token = jwt.sign(
                    {
                      _id: data._id,
                      email: data.email,
                      image: data.image,
                      first_name: data.first_name,
                      last_name: data.last_name,
                      wallet: data.wallet,
                    },
                    process.env.JWT_SECRET ?? "vinayanac",
                    { expiresIn: "1d" }
                  );
                  data.password = undefined;
                  // console.log(user._id);
                  let myObjectId = user._id;
                  let myObjectIdString = myObjectId.toString();
                  // console.log(myObjectIdString);
                  const cart = await cartModel.findOne({
                    user_id: myObjectIdString,
                  });
                  let cartCount;
                  if (cart === null) {
                    cartCount = 0;
                  } else {
                    cartCount = cart?.cart_count;
                  }
                  console.log(cart);
                  return res.json({
                    success: true,
                    token,
                    cart_count: cartCount,
                    user: data,
                    message: "Login Successfully",
                  });
                })
                .catch((err) => {
                  return res.status(401).json({
                    message: "signup error",
                  });
                });
            }
          });
        } else {
          return res.status(400).json({
            error: "Google login failed. Try again",
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};
