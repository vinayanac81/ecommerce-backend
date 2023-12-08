import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connect from "./config/db.js";
import UserRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import authRoute from "./routes/authRoute.js";
import { fileURLToPath } from "url";
const app = express();

dotenv.config();
connect();
const PORT = process.env.PORT || 1009;
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors({ origin: "https://ecommerce-frong.onrender.com" }));
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
app.use("/", UserRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
