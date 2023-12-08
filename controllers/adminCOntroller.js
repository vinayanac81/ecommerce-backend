import brandModel from "../model/brandModel.js";
import categoryModel from "../model/categoryModel.js";
import orderModel from "../model/orderModel.js";
import productModel from "../model/productModel.js";
import mongoose from "mongoose";
import userModel from "../model/userModel.js";
import coupenModel from "../model/coupenMode.js";
const ObjectId = mongoose.Types.ObjectId;
export const addProduct = async (req, res) => {
  try {
    let { productData } = req.query;
    console.log(productData);
    productData.price = parseInt(productData.price);
    productData.stock = parseInt(productData.stock);
    console.log(req.file.filename);
    await productModel.create({
      product_name: productData.productName,
      price: productData.price,
      image: req.file.filename,
      stock: productData.stock,
      description: productData.description,
      category: productData.category,
      sub_category: productData.subCategory,
      disable: false,
    });
    return res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const pages = page || 1;
    const limits = limit || 10;
    const exist = (pages - 1) * limits;
    // console.log(exist, limit, page);
    const productLength = await productModel.find({});
    const products = await productModel.find({}).skip(exist).limit(limits);
    // console.log(products);
    let totpage;
    let lengthVal = productLength.length;
    // console.log(lengthVal);
    if (lengthVal > limits) {
      if (lengthVal % limits === 0) {
        totpage = lengthVal / limits;
        res.json({
          msg: "Data fetched",
          success: true,
          totalPages: totpage,
          products,
          totalProducts: lengthVal,
        });
      } else {
        totpage = lengthVal / limits;
        totpage = Math.floor(totpage) + 1;
        res.json({
          msg: "Data fetched",
          success: true,
          totalPages: totpage,
          products,
          totalProducts: lengthVal,
        });
      }
    } else if (lengthVal < limits) {
      totpage = lengthVal / limits;
      // console.log(totpage);
      totpage = Math.floor(totpage) + 1;
      res.json({
        msg: "Data fetched",
        success: true,
        totalPages: totpage,
        products,
        totalProducts: lengthVal,
      });
    } else {
      totpage = lengthVal / limits;
      res.json({
        msg: "Data fetched",
        success: true,
        totalPages: totpage,
        products,
        totalProducts: lengthVal,
      });
    }
    // return res.json({ success: true, products });
  } catch (error) {
    console.log(error);
  }
};
export const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const category = await categoryModel.find({});
    const brand = await brandModel.find({});
    const product = await productModel.findOne({ _id: new ObjectId(id) });
    return res.json({ success: true, product, brand, category });
  } catch (error) {
    console.log(error);
  }
};
export const editProduct = async (req, res) => {
  try {
    let { product } = req.query;
    product.price = parseInt(product.price);
    product.stock = parseInt(product.stock);
    console.log(product);
    if (!req.file) {
      await productModel.updateOne(
        { _id: new ObjectId(product._id) },
        {
          $set: {
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
            sub_category: product.sub_category,
          },
        }
      );
      return res.json({ success: true, message: "Successfully edited" });
    }
    await productModel.updateOne(
      { _id: new ObjectId(product._id) },
      {
        $set: {
          product_name: product.product_name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          image: req.file.filename,
          category: product.category,
          sub_category: product.sub_category,
        },
      }
    );
    return res.json({ success: true, message: "Successfully edited" });
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.productStatus === "disable") {
      await productModel.updateOne(
        { _id: new ObjectId(req.body.productId) },
        {
          $set: {
            disable: true,
          },
        }
      );
      res.json({ success: true, message: "Disabled Successfully" });
    } else {
      await productModel.updateOne(
        { _id: new ObjectId(req.body.productId) },
        {
          $set: {
            disable: false,
          },
        }
      );
      res.json({ success: true, message: "Enabled Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const addCategory = async (req, res) => {
  try {
    console.log(req.query.category);
    let { category } = req.query;
    category = category.toUpperCase();
    await categoryModel.create({
      category_name: category,
    });
    return res.json({ success: true, message: "Category added" });
  } catch (error) {
    console.log(error);
  }
};
export const getCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    return res.json({ success: true, category });
  } catch (error) {
    console.log(error);
  }
};
export const getSingleCategory = async (req, res) => {
  try {
    console.log("k");
    const category = await categoryModel.findOne({
      _id: new ObjectId(req.query.id),
    });
    return res.json({ success: true, category });
  } catch (error) {
    console.log(error);
  }
};
export const editCategory = async (req, res) => {
  try {
    let { category, categoryId } = req.query;
    category = category.toUpperCase();
    await categoryModel.updateOne(
      { _id: new ObjectId(categoryId) },
      {
        $set: {
          category_name: category,
        },
      }
    );
    return res.json({ success: true, message: "Successfully edited" });
  } catch (error) {
    console.log(error);
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.query;
    await categoryModel.deleteOne({ _id: new ObjectId(id) });
    return res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const addBrand = async (req, res) => {
  try {
    console.log(req.query.brand);
    let { brand } = req.query;
    brand = brand.toUpperCase();
    await brandModel.create({
      brand_name: brand,
    });
    return res.json({ success: true, message: "Brand added" });
  } catch (error) {
    console.log(error);
  }
};
export const getBrand = async (req, res) => {
  try {
    const brand = await brandModel.find({});
    return res.json({ success: true, brand });
  } catch (error) {
    console.log(error);
  }
};
export const getSingleBrand = async (req, res) => {
  try {
    console.log("k");
    const brand = await brandModel.findOne({
      _id: new ObjectId(req.query.id),
    });
    return res.json({ success: true, brand });
  } catch (error) {
    console.log(error);
  }
};
export const editBrand = async (req, res) => {
  try {
    let { brand, brandId } = req.query;
    brand = brand.toUpperCase();
    await brandModel.updateOne(
      { _id: new ObjectId(brandId) },
      {
        $set: {
          brand_name: brand,
        },
      }
    );
    return res.json({ success: true, message: "Successfully edited" });
  } catch (error) {
    console.log(error);
  }
};
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.query;
    await brandModel.deleteOne({ _id: new ObjectId(id) });
    return res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getDashboardData = async (req, res) => {
  try {
    const orders = await orderModel.find({ payment_status: "success" });
    const totalOrders = orders.length;
    const users = await userModel.find({});
    const totalUsers = users.length;
    const totalOrder = await orderModel.find({});
    let currentDate = new Date(new Date().setUTCHours(0, 0, 0, 0));
    const payments = await orderModel.aggregate([
      {
        $match: {
          payment_status: "success",
          date: currentDate,
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
          user: { $arrayElemAt: ["$user", 0] },
          _id: 1,
          date: 1,
          payment_status: 1,
          after_discount: 1,
          product: 1,
        },
      },
    ]);
    let amount = 0;
    console.log(orders);
    orders.forEach((order) => {
      amount = parseInt(amount) + order.after_discount;
    });
    // console.log(amount);
    res.json({
      success: true,
      totalOrders: totalOrder.length,
      totalUsers,
      amount,
      payments,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBookingList = async (req, res) => {
  try {
    const { type } = req.query;
    console.log(type);
    if (type.placed === "true") {
      const orders = await orderModel.aggregate([
        {
          $match: {
            order_status: "placed",
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
            date: 1,
            products: 1,
            payment_status: 1,
            user_id: 1,
            payment_method: 1,
            order_status: 1,
            after_discount: 1,
            product: 1,
          },
        },
      ]);
      // console.log(orders);
      res.json({ success: true, orders });
    } else if (type.shipped === "true") {
      const orders = await orderModel.aggregate([
        {
          $match: {
            order_status: "shipped",
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
            date: 1,
            payment_status: 1,
            products: 1,
            payment_method: 1,
            user_id: 1,
            order_status: 1,
            after_discount: 1,
            product: 1,
          },
        },
      ]);
      console.log(orders);
      res.json({ success: true, orders });
    } else if (type.delivered === "true") {
      const orders = await orderModel.aggregate([
        {
          $match: {
            order_status: "delivered",
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
            user_id: 1,
            date: 1,
            payment_status: 1,
            payment_method: 1,
            order_status: 1,
            after_discount: 1,
            product: 1,
          },
        },
      ]);

      res.json({ success: true, orders });
    } else if (type.cancelled === "true") {
      const orders = await orderModel.aggregate([
        {
          $match: {
            $or: [{ order_status: "cancel" }, { order_status: "return" }],
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
            user_id: 1,
            date: 1,
            payment_status: 1,
            payment_method: 1,
            order_status: 1,
            after_discount: 1,
            product: 1,
          },
        },
      ]);
      console.log(orders.length);
      res.json({ success: true, orders });
    }
  } catch (error) {
    console.log(error);
  }
};
export const addCoupen = async (req, res) => {
  try {
    const { coupenData } = req.body;
    console.log(coupenData);
    const create_date = new Date(
      new Date(coupenData.createDate).setUTCHours(0, 0, 0, 0)
    );
    const expiry_date = new Date(
      new Date(coupenData.expiryDate).setUTCHours(0, 0, 0, 0)
    );
    console.log(create_date, expiry_date);
    await coupenModel.create({
      name: coupenData.coupenName,
      code: coupenData.coupenCOde,
      discount: coupenData.discountPercentage,
      min_amount: coupenData.minimumPurchaseAmount,
      max_discount: coupenData.maximumDiscount,
      create_date: create_date,
      expiry_date: expiry_date,
      is_deleted: false,
    });
    res.json({ success: true, message: "Coupen added successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getCoupens = async (req, res) => {
  try {
    const data = await coupenModel.aggregate([
      {
        $match: {
          is_deleted: false,
        },
      },
    ]);
    res.json({ success: true, coupens: data });
  } catch (error) {
    console.log(error);
  }
};
export const getAllUsers = async (req, res) => {
  try {
    let { limit, page } = req.query;
    const pages = page || 1;
    const limits = limit || 10;
    const exist = (pages - 1) * limits;
    const totalUsers = await userModel.find({});
    let users = await userModel.find({}).skip(exist).limit(limits);
    let totalPage;
    let lengthVal = totalUsers.length;
    users.forEach((user) => {
      user.password = undefined;
    });
    if (lengthVal > limits) {
      if (lengthVal % limits === 0) {
        totalPage = lengthVal / limits;
        res.json({
          msg: "Data fetched",
          success: true,
          totalPages: totalPage,
          users,
          totalUsers: lengthVal,
        });
      } else {
        totalPage = lengthVal / limits;
        totalPage = Math.floor(totalPage) + 1;
        res.json({
          msg: "Data fetched",
          success: true,
          totalPages: totalPage,
          users,
          totalUsers: lengthVal,
        });
      }
    } else if (lengthVal < limits) {
      totalPage = lengthVal / limits;
      totalPage = Math.floor(totalPage) + 1;
      res.json({
        msg: "Data fetched",
        success: true,
        totalPages: totalPage,
        users,
        totalUsers: lengthVal,
      });
    } else {
      totalPage = lengthVal / limits;
      res.json({
        msg: "Data fetched",
        success: true,
        totalPages: totalPage,
        users,
        totalUsers: lengthVal,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const shipOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    await orderModel.findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          order_status: "shipped",
        },
      }
    );
    res.json({ success: true, message: "Item Shipped" });
  } catch (error) {
    console.log(error);
  }
};
export const deliveredOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    await orderModel.findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          order_status: "delivered",
          payment_status: "success",
        },
      }
    );
    res.json({ success: true, message: "Item Delivered" });
  } catch (error) {
    console.log(error);
  }
};
export const cancelOrder = async (req, res) => {
  try {
    const { orderId, paymentMethod, price, userId, products } = req.body;
    console.log(price, paymentMethod, userId, products);
    products.forEach(async (item, id) => {
      await productModel.updateOne(
        { _id: new ObjectId(item.product_id) },
        {
          $inc: { stock: item.quantity },
        }
      );
    });
    if (paymentMethod === "ONLINE") {
      const user = await userModel.findOne({ _id: new ObjectId(userId) });
      let wallet = user.wallet;
      wallet = wallet + price;
      await userModel.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            wallet: wallet,
          },
        }
      );
      await orderModel.findOneAndUpdate(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            order_status: "cancel",
            payment_status: "cash return",
          },
        }
      );
      res.json({ success: true, message: "Item Cancelled" });
    } else {
      await orderModel.findOneAndUpdate(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            order_status: "cancel",
          },
        }
      );
      res.json({ success: true, message: "Item Cancelled" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const returnOrder = async (req, res) => {
  try {
    const { orderId, paymentMethod, price, userId, products } = req.body;
    console.log(price, paymentMethod, userId, products);
    products.forEach(async (item, id) => {
      await productModel.updateOne(
        { _id: new ObjectId(item.product_id) },
        {
          $inc: { stock: item.quantity },
        }
      );
    });
    if (paymentMethod === "ONLINE") {
      const user = await userModel.findOne({ _id: new ObjectId(userId) });
      let wallet = user.wallet;
      wallet = wallet + price;
      await userModel.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            wallet: wallet,
          },
        }
      );
      await orderModel.findOneAndUpdate(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            order_status: "return",
            payment_status: "cash return",
          },
        }
      );
      res.json({ success: true, message: "Item returned" });
    } else {
      await orderModel.findOneAndUpdate(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            order_status: "return",
          },
        }
      );
      res.json({ success: true, message: "Item returned" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await userModel.findOne({
      _id: new ObjectId(req.query.userId),
    });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
  }
};
export const blockUser = async (req, res) => {
  try {
    await userModel.findOneAndUpdate(
      { _id: new ObjectId(req.body.userId) },
      {
        $set: {
          block: true,
        },
      }
    );
    res.json({ success: true, message: "Blocked successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const unblockUser = async (req, res) => {
  try {
    await userModel.findOneAndUpdate(
      { _id: new ObjectId(req.body.userId) },
      {
        $set: {
          block: false,
        },
      }
    );
    res.json({ success: true, message: "Unblocked successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getCategoryAndBrand = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    const brand = await brandModel.find({});
    res.json({ success: true, category, brand });
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
