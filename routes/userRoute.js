import express from "express";
import multer from "multer";
import {
  addAddress,
  addToCart,
  applyCoupon,
  createOrder,
  decrementQuantity,
  deleteAddress,
  filterByCategory,
  getAddress,
  getAllCartProducts,
  getAllProducts,
  getBookedDetail,
  getBookingList,
  getBrandProducts,
  getNavbarData,
  getOrderDetails,
  getProduct,
  getProducts,
  getReferralData,
  getSingleProductData,
  incrementQuantity,
  order,
  removeFromCart,
  updateAddress,
  updatePassword,
  updateProfilePic,
  verify,
} from "../controllers/userCOntroller.js";
import { userAuth } from "../middleware/auth.js";

const router = express.Router();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: fileStorage });
router.get("/get-products", getProducts);
router.post("/add-to-cart", userAuth, addToCart);
router.get("/get-cart-products", userAuth, getAllCartProducts);
router.post("/decrement-quantity", userAuth, decrementQuantity);
router.post("/increment-quantity", userAuth, incrementQuantity);
router.post("/remove-from-cart", userAuth, removeFromCart);
router.get("/get-product", userAuth, getProduct);
router.post("/order", userAuth, order);
router.post("/create-order", userAuth, createOrder);
router.post("/verify", userAuth, verify);
router.get("/get-booking-list", userAuth, getBookingList);
router.get("/get-booked-detail", userAuth, getBookedDetail);
router.get("/get-navbar-data", getNavbarData);
router.get("/get-brand-products", getBrandProducts);
router.get("/filter-by-category", filterByCategory);
router.get("/get-all-products", getAllProducts);
router.post(
  "/update-profile-image",
  userAuth,
  upload.single("profile"),
  updateProfilePic
);
router.post("/apply-coupon", userAuth, applyCoupon);
router.get("/get-address", userAuth, getAddress);
router.post("/add-address", userAuth, addAddress);
router.post("/update-password", userAuth, updatePassword);
router.post("/update-address", userAuth, updateAddress);
router.post("/delete-address", userAuth, deleteAddress);
router.get("/get-referral-data", userAuth, getReferralData);
router.get("/get-single-product-data", userAuth, getSingleProductData);
router.get("/get-order-details",userAuth,getOrderDetails)
export default router;
