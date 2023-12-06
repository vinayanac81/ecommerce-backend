import express from "express";
import { adminAuth, userAuth } from "../middleware/auth.js";
import multer from "multer";
import {
  addBrand,
  addCategory,
  addCoupen,
  addProduct,
  blockUser,
  cancelOrder,
  deleteBrand,
  deleteCategory,
  deleteProduct,
  deliveredOrder,
  editBrand,
  editCategory,
  editProduct,
  getAllProducts,
  getAllUsers,
  getBookingList,
  getBrand,
  getCategory,
  getCategoryAndBrand,
  getCoupens,
  getDashboardData,
  getOrderDetails,
  getProduct,
  getSingleBrand,
  getSingleCategory,
  getUser,
  returnOrder,
  shipOrder,
  unblockUser,
} from "../controllers/adminCOntroller.js";
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

//get methods
//post methods
router.post("/add-product", adminAuth, upload.single("image"), addProduct);
router.get("/all-products", adminAuth, getAllProducts);
router.get("/get-product", adminAuth, getProduct);
router.post(
  "/edit-product",
  adminAuth,
  upload.single("edited-image"),
  editProduct
);
router.post("/add-category", adminAuth, addCategory);
router.get("/get-category", adminAuth, getCategory);
router.get("/get-single-category", adminAuth, getSingleCategory);
router.post("/edit-category", adminAuth, editCategory);
router.post("/delete-category", adminAuth, deleteCategory);
router.post("/add-brand", adminAuth, addBrand);
router.get("/get-brand", adminAuth, getBrand);
router.get("/get-single-brand", adminAuth, getSingleBrand);
router.post("/edit-brand", adminAuth, editBrand);
router.post("/delete-brand", adminAuth, deleteBrand);
router.get("/get-dashboard-data", adminAuth, getDashboardData);
router.get("/get-booking-list", adminAuth, getBookingList);
router.post("/add-coupen", adminAuth, addCoupen);
router.get("/get-coupens", adminAuth, getCoupens);
router.get("/get-all-users", adminAuth, getAllUsers);
router.post("/ship-order", adminAuth, shipOrder);
router.post("/delivered-order", adminAuth, deliveredOrder);
router.post("/cancel-order", adminAuth, cancelOrder);
router.post("/return-order", adminAuth, returnOrder);
router.post("/disableProduct", adminAuth, deleteProduct);
router.get("/view-user", adminAuth, getUser);
router.post("/block-user", adminAuth, blockUser);
router.post("/unblock-user", adminAuth, unblockUser);
router.get("/get-category-and-brand",adminAuth,getCategoryAndBrand)
router.get("/get-order-details",adminAuth,getOrderDetails)
export default router;
