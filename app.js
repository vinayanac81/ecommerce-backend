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
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://ecommerce-frong.onrender.com"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use("/", UserRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
