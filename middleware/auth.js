import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
  try {
    // console.log(req.headers["authorization"]);
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    if (!token) {
      console.log("o");
      res.json({ noToken: true, message: "Authorization Failed" });
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET ?? "vinayan",
      (err, decodedToken) => {
      
        // console.log(decodedToken);
        if (decodedToken) {
          req.body.userId = decodedToken._id;
          // console.log(req.body.userId);
          next();
        } else {
          return res.status(401).json({
            message: "unauthorized user",
            success: false,
            tokenExp: true,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const adminAuth = (req, res, next) => {
  try {
    // console.log(req.headers["authorization"]);
    const token = req.headers["authorization"].split(" ")[1];
    if (token === undefined) {
      return res
        .status(401)
        .json({ noToken: true, message: "Authorization Failed" });
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET ?? "vinayanac",
      (err, decodedToken) => {
        //   console.log(decodedToken);
        if (decodedToken) {
          req.body.adminId = decodedToken._id;
          next();
        } else {
          res.status(401).json({
            message: "unauthorized user",
            success: false,
            tokenExp: true,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
