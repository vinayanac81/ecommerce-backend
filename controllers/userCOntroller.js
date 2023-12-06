import cartModel from "../model/cartModel.js";
import productModel from "../model/productModel.js";
import orderModel from "../model/orderModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import Razorpay from "razorpay";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import crypto from "crypto";
import categoryModel from "../model/categoryModel.js";
import brandModel from "../model/brandModel.js";
import userModel from "../model/userModel.js";
import coupenModel from "../model/coupenMode.js";
import addressModel from "../model/addressModel.js";
dotenv.config();
export const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({ stock: { $gt: 0 } })
      .skip(0)
      .limit(8);
    return res.json({ success: true, products });
  } catch (error) {
    console.log(error);
  }
};
export const addToCart = async (req, res) => {
  try {
    const product = await productModel.findOne({
      _id: new ObjectId(req.query.id),
    });
    const ifCart = await cartModel.findOne({ user_id: req.body.userId });
    if (!ifCart) {
      await cartModel.create({
        user_id: req.body.userId,
        cart_count: 1,
        cart_products: [
          {
            product_id: product._id,
            quantity: 1,
            total_price: product.price,
            product_name: product.product_name,
            price: product.price,
            stock: product.stock,
            category: product.category,
            sub_category: product.sub_category,
            image: product.image,
            description: product.description,
          },
        ],
      });
      return res.json({ success: true, cart_count: 1 });
    } else {
      const available = await cartModel.findOne({
        cart_products: {
          $elemMatch: { product_id: new ObjectId(req.query.id) },
        },
      });
      if (available) {
        await cartModel.updateOne(
          {
            user_id: req.body.userId,
            "cart_products.product_id": new ObjectId(req.query.id),
          },
          {
            $inc: { "cart_products.$.quantity": 1 },
          }
        );
        const count = await cartModel.findOne({
          user_id: new ObjectId(req.body.userId),
        });
        return res.json({
          success: true,
          cart_count: count.cart_count,
          message: "Added to cart",
        });
      } else {
        await cartModel.updateOne(
          { user_id: req.body.userId },
          {
            $push: {
              cart_products: {
                product_id: product._id,
                quantity: 1,
                product_name: product.product_name,
                price: product.price,
                total_price: product.price,
                stock: product.stock,
                category: product.category,
                sub_category: product.sub_category,
                image: product.image,
                description: product.description,
              },
            },
          }
        );
        await cartModel.updateOne(
          { user_id: req.body.userId },
          { $inc: { cart_count: 1 } }
        );
        const count = await cartModel.findOne({
          user_id: new ObjectId(req.body.userId),
        });
        return res.json({
          success: true,
          cart_count: count.cart_count ? count.cart_count : 0,
          message: "Added to cart",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllCartProducts = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ user_id: req.body.userId });
    const address = await addressModel.findOne({
      user_id: new ObjectId(req.body.userId),
    });
    const wallet=await userModel.findOne({_id:new ObjectId(req.body.userId)}).select("wallet")
    res.json({ success: true, cart, address,wallet });
  } catch (error) {
    console.log(error);
  }
};
export const decrementQuantity = async (req, res) => {
  try {
    let { price, count, id } = req.query;
    count = parseInt(count) - 1;
    price = parseInt(price) * parseInt(count);
    console.log(price, count);
    await cartModel.updateOne(
      {
        user_id: req.body.userId,
        "cart_products.product_id": new ObjectId(req.query.id),
      },
      {
        $inc: { "cart_products.$.quantity": -1 },
      }
    );
    await cartModel.updateOne(
      {
        user_id: req.body.userId,
        "cart_products.product_id": new ObjectId(req.query.id),
      },
      {
        $set: {
          "cart_products.$.total_price": price,
        },
      }
    );
    const cart = await cartModel.findOne({ user_id: req.body.userId });
    res.json({ success: true, cart });
  } catch (error) {
    console.log(error);
  }
};
export const incrementQuantity = async (req, res) => {
  try {
    let { price, count, id } = req.query;
    count = parseInt(count) + 1;
    console.log(price, count);
    price = parseInt(price) * parseInt(count);
    console.log(price);
    await cartModel.updateOne(
      {
        user_id: req.body.userId,
        "cart_products.product_id": new ObjectId(req.query.id),
      },
      {
        $inc: { "cart_products.$.quantity": 1 },
      }
    );
    await cartModel.updateOne(
      {
        user_id: req.body.userId,
        "cart_products.product_id": new ObjectId(req.query.id),
      },
      {
        $set: {
          "cart_products.$.total_price": price,
        },
      }
    );
    const cart = await cartModel.findOne({ user_id: req.body.userId });
    res.json({ success: true, cart });
  } catch (error) {
    console.log(error);
  }
  0;
};
export const removeFromCart = async (req, res) => {
  try {
    await cartModel.updateOne(
      {
        user_id: req.body.userId,
      },
      {
        $pull: {
          cart_products: { product_id: new ObjectId(req.query.id) },
        },
      }
    );
    await cartModel.updateOne(
      {
        user_id: req.body.userId,
      },
      {
        $inc: { cart_count: -1 },
      }
    );
    const cart = await cartModel.findOne({ user_id: req.body.userId });
    res.json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
    console.log(error);
  }
};
export const getProduct = async (req, res) => {
  try {
    const product = await cartModel.findOne(
      {
        user_id: new ObjectId(req.body.userId),
      },
      {
        cart_products: {
          $elemMatch: { product_id: new ObjectId(req.query.id) },
        },
      }
    );
    const wallet=await userModel.findOne({_id:new ObjectId(req.body.userId)}).select("wallet")
    const address = await addressModel.findOne({
      user_id: new ObjectId(req.body.userId),
    });
    res.json({ success: true, product: product.cart_products[0], address ,wallet});
  } catch (error) {
    console.log(error);
  }
};
export const order = async (req, res) => {
  try {
    let { paymentDetails, arr } = req.query;
    console.log(paymentDetails);
    const { product } = req.body;
    // console.log(product);
    let { cod, amount, after_discount, addressId, discount_price } =
      paymentDetails;
    let currentDate = new Date(new Date(new Date()).setUTCHours(0, 0, 0, 0));
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
    if (cod === "true") {
      if (arr === "false") {
        await orderModel.create({
          order_id: referral,
          user_id: req.body.userId,
          total_price: parseInt(amount),
          date: currentDate,
          discount_price: parseInt(discount_price),
          after_discount: parseInt(after_discount),
          address_id: addressId,
          products: [product],
          order_status: "placed",
          payment_status: "pending",
          payment_method: "COD",
        });
        await cartModel.updateOne(
          {
            user_id: req.body.userId,
          },
          {
            $pull: {
              cart_products: { product_id: new ObjectId(product.product_id) },
            },
          }
        );
        await cartModel.updateOne(
          {
            user_id: req.body.userId,
          },
          {
            $inc: { cart_count: -1 },
          }
        );
        await productModel.updateOne(
          { _id: new ObjectId(product.product_id) },
          {
            $inc: { stock: -product.quantity },
          }
        );
        const cart = await cartModel.findOne({ user_id: req.body.userId });
        res.json({ success: true, cart });
      } else {
        await orderModel.create({
          order_id: referral,
          user_id: req.body.userId,
          total_price: parseInt(amount),
          date: currentDate,
          discount_price: parseInt(discount_price),
          after_discount: parseInt(after_discount),
          address_id: addressId,
          products: product,
          order_status: "placed",
          payment_status: "pending",
          payment_method: "COD",
        });
        await cartModel.deleteOne({
          user_id: req.body.userId,
        });
        product.forEach(async (item) => {
          await productModel.updateOne(
            { _id: new ObjectId(item.product_id) },
            {
              $inc: { stock: -item.quantity },
            }
          );
        });
        const cart = await cartModel.findOne({ user_id: req.body.userId });
        res.json({ success: true, cart });
      }
    } else {
      let instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
      });
      let options = {
        amount: parseInt(after_discount) * 100,
        currency: "INR",
      };
      instance.orders.create(options, (err, order) => {
        if (err) {
          console.log(err);
          return res.send({ code: 500, message: "Server Error" });
        }
        return res.send({
          code: 200,
          message: "order created",
          data: order,
          success: true,
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const createOrder = async (req, res) => {
  try {
    let { orderId, paymentDetails, arr } = req.query;
    let { userId, product } = req.body;
    let { amount, after_discount, addressId, discount_price } = paymentDetails;
    let currentDate = new Date(new Date(new Date()).setUTCHours(0, 0, 0, 0));
    if (arr === "false") {
      await orderModel.create({
        order_id: orderId,
        user_id: req.body.userId,
        total_price: parseInt(amount),
        date: currentDate,
        products: [product],
        discount_price: discount_price,
        after_discount: after_discount,
        address_id: addressId,
        order_status: "payment pending",
        payment_status: "pending",
        payment_method: "ONLINE",
      });
      res.status(200).json({ success: true, message: "success" });
    } else {
      await orderModel.create({
        order_id: orderId,
        user_id: req.body.userId,
        total_price: parseInt(amount),
        date: currentDate,
        products: product,
        discount_price: discount_price,
        after_discount: after_discount,
        address_id: addressId,
        order_status: "payment pending",
        payment_status: "pending",
        payment_method: "ONLINE",
      });
      res.status(200).json({ success: true, message: "success" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const verify = async (req, res) => {
  try {
    let { userId, response } = req.body;
    let { product, arr } = req.query;
    const body =
      response.razorpay_order_id + "|" + response.razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature === req.body.response.razorpay_signature) {
      if (arr === "false") {
        await orderModel.updateOne(
          { order_id: response.razorpay_order_id },
          {
            $set: {
              order_status: "Placed",
              payment_status: "success",
            },
          }
        );
        await cartModel.updateOne(
          {
            user_id: userId,
          },
          {
            $pull: {
              cart_products: { product_id: new ObjectId(product.product_id) },
            },
          }
        );
        await cartModel.updateOne(
          {
            user_id: userId,
          },
          {
            $inc: { cart_count: -1 },
          }
        );
        await productModel.updateOne(
          { _id: new ObjectId(product.product_id) },
          {
            $inc: { stock: -product.quantity },
          }
        );
        const cart = await cartModel.findOne({ user_id: req.body.userId });
        res.json({ success: true, cart, message: "Payment successfull" });
      } else {
        await cartModel.deleteOne({
          user_id: req.body.userId,
        });
        await orderModel.updateOne(
          { order_id: response.razorpay_order_id },
          {
            $set: {
              order_status: "Placed",
              payment_status: "Success",
            },
          }
        );
        product.forEach(async (item, id) => {
          await productModel.updateOne(
            { _id: new ObjectId(item.product_id) },
            {
              $inc: { stock: -item.quantity },
            }
          );
        });
        const cart = await cartModel.findOne({ user_id: req.body.userId });
        res.json({ success: true, cart });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const getBookingList = async (req, res) => {
  try {
    const bookingList = await orderModel.aggregate([
      {
        $match: {
          user_id: new ObjectId(req.body.userId),
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "address_id",
          foreignField: "_id",
          as: "address",
        },
      },
      {
        $project: {
          address: { $arrayElemAt: ["$address", 0] },
          _id: 1,
          order_id: 1,
          user_id: 1,
          discount_price: 1,
          after_discount: 1,
          total_price: 1,
          date: 1,
          products: 1,
          order_status: 1,
          payment_status: 1,
          payment_method: 1,
        },
      },
    ]);
    res.json({ success: true, bookingList });
  } catch (error) {
    console.log(error);
  }
};
export const getBookedDetail = async (req, res) => {
  try {
    console.log(req.query.orderId);
    const data = await orderModel.findOne({
      user_id: new ObjectId(req.body.userId),
    });

    res.json({ success: true, bookedProduct: data });
  } catch (error) {
    console.log(error);
  }
};
export const getNavbarData = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    const brands = await brandModel.find({});
    res.json({ success: true, category, brands });
  } catch (error) {
    console.log(error);
  }
};
export const getBrandProducts = async (req, res) => {
  try {
    const { userId } = req.body;
    let { category } = req.query;
    category = category.toLowerCase();
    const data = await productModel.aggregate([
      {
        $match: {
          sub_category: category,
        },
      },
    ]);
    res.json({ success: true, products: data });
  } catch (error) {
    console.log(error);
  }
};
export const filterByCategory = async (req, res) => {
  try {
    let { category } = req.query;
    category = category.toLowerCase();
    const data = await productModel.aggregate([
      {
        $match: {
          category: category,
        },
      },
    ]);
    res.json({ success: true, products: data });
  } catch (error) {
    console.log(error);
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const data = await productModel.find({});
    res.json({ success: true, products: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfilePic = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId, req?.file?.filename);
    const file = req?.file?.filename;
    await userModel.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          image: file,
        },
      }
    );
    const user = await userModel.findOne({ _id: new ObjectId(userId) });
    res.json({ success: true, message: "Profile Pic Updated...", user });
  } catch (error) {
    console.log(error);
  }
};
export const applyCoupon = async (req, res) => {
  try {
    let { couponCode, amount } = req.body;
    // console.log(amount);
    couponCode = couponCode.toUpperCase();
    const data = await coupenModel.findOne({ code: couponCode });
    // console.log(data);
    let date = data.expiry_date;
    let minimumPurchaseAmount = data.min_amount;
    if (minimumPurchaseAmount >= amount) {
      return res.json({
        success: false,
        message: `Minimum purchase amount ${minimumPurchaseAmount} rupees`,
      });
    }
    let discount = data.discount;
    let maximumDiscout = data.max_discount;
    console.log(data);
    discount = parseInt(discount);
    // console.log(date);
    let expDate = new Date(date).getTime();
    let currentDate = new Date().getTime();
    // console.log(expDate,currentDate);
    if (currentDate <= expDate) {
      let totalAmount = ((amount / 100) * discount).toFixed(0);
      if (totalAmount > maximumDiscout) {
        totalAmount = maximumDiscout;
        res.json({
          success: true,
          discount: totalAmount,
          message: "Coupon applied",
        });
      } else {
        res.json({
          success: true,
          discount: totalAmount,
          message: "Coupon applied",
        });
      }
    } else {
      res.json({ couponExp: true, message: "Sorry Coupon Expired" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const address = await addressModel.findOne({
      user_id: new ObjectId(userId),
    });
    if (!address) {
      res.json({ noAddress: true });
    } else {
      res.json({ success: true, address });
    }
  } catch (error) {
    console.log(error);
  }
};
export const addAddress = async (req, res) => {
  let { address, userId } = req.body;
  let {
    firstName,
    lastName,
    email,
    phoneNumber,
    pincode,
    place,
    district,
    state,
  } = address;
  await addressModel.create({
    user_id: userId,
    first_name: firstName.toLowerCase(),
    last_name: lastName.toLowerCase(),
    email: email.toLowerCase(),
    address: address.address.toLowerCase(),
    state: state.toLowerCase(),
    phone_number: phoneNumber,
    pincode,
    place: place.toLowerCase(),
    district: district.toLowerCase(),
  });
  res.json({ success: true, message: "Address added successfully" });
};
export const updatePassword = async (req, res) => {
  try {
    console.log(req.body.userId);
    let { newPassword, oldPassword } = req.body.password;
    const userData = await userModel.findOne({
      _id: new ObjectId(req.body.userId),
    });
    if (userData.password === undefined) {
      console.log(req.body.password);
      newPassword = await bcrypt.hash(newPassword, 12);
      await userModel.updateOne(
        {
          _id: new ObjectId(req.body.userId),
        },
        {
          $set: {
            password: newPassword,
          },
        }
      );
      res.json({ success: true, message: "Password Updated Successfully" });
    } else {
      let correct = await bcrypt.compare(oldPassword, userData.password);
      console.log(correct);
      if (correct) {
        newPassword = await bcrypt.hash(newPassword, 12);
        await userModel.updateOne(
          {
            _id: new ObjectId(req.body.userId),
          },
          {
            $set: {
              password: newPassword,
            },
          }
        );
        res.json({ success: true, message: "Password Updated Successfully" });
      } else {
        res.json({
          success: false,
          passwordError: true,
          message: "Old Password Is Incorrect",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateAddress = async (req, res) => {
  try {
    const { addressId, addressData } = req.body;
    await addressModel.updateOne(
      { _id: new ObjectId(addressId) },
      {
        $set: {
          first_name: addressData.firstName,
          last_name: addressData.lastName,
          email: addressData.email,
          phone_number: addressData.phoneNumber,
          address: addressData.address,
          pincode: addressData.pincode,
          district: addressData.district,
          place: addressData.place,
          state: addressData.state,
        },
      }
    );
    res.json({ success: true, message: "Address updated successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.body;
    await addressModel.deleteOne({ _id: new ObjectId(addressId) });
    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getReferralData = async (req, res) => {
  try {
    const referralData = await userModel
      .findOne({ _id: new ObjectId(req.body.userId) })
      .select("referral_code")
      .select("referrals");
    let length = referralData.referrals.length;
    res.json({ success: true, referralData, totalReferrals: length });
  } catch (error) {
    console.log(error);
  }
};
export const getSingleProductData = async (req, res) => {
  try {
    const { productId } = req.query;
    console.log(req.query);
    const productData = await productModel.findOne({
      _id: new ObjectId(productId),
    });
    res.json({ success: true, productData });
  } catch (error) {
    console.log(error);
  }
};
export const getOrderDetails = async (req, res) => {
  try {
    const orderdata = await orderModel.aggregate([
      {
        $match: {
          _id: new ObjectId(req.query.orderId),
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "address_id",
          foreignField: "_id",
          as: "address",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          address: { $arrayElemAt: ["$address", 0] },
          user: { $arrayElemAt: ["$user", 0] },
          _id: 1,
          user_id: 1,
          date: 1,
          address_id: 1,
          payment_status: 1,
          payment_method: 1,
          order_status: 1,
          after_discount: 1,
          discount_price: 1,
          products: 1,
        },
      },
    ]);
    res.json({ success: true, orderdata });
  } catch (error) {
    console.log(error);
  }
};