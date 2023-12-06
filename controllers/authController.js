import mongoose from "mongoose";
import adminModel from "../model/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
import cartModel from "../model/cartModel.js";
import { OAuth2Client } from "google-auth-library";
const ObjectId = mongoose.Types.ObjectId;
export const adminLogin = async (req, res) => {
  try {
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
export const userSignup = async (req, res) => {
  try {
    const { signupData } = req.query;
    let { first_name, last_name, email, password } = signupData;
    console.log(first_name, last_name, email, password);
    password = await bcrypt.hash(password, 12);
    await userModel.create({
      first_name,
      last_name,
      email,
      password,
    });
    res.status(201).json({ success: true, message: "Account Created" });
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
      .verifyIdToken({ idToken, audience: `${process.env.CLIENT_ID}` })
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
