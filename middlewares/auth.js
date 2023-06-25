const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.header("Authorization");
  try {
    if (!token)
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Provide token",
        data: [],
      });
    const verified = jwt.verify(token, process.env.JWTSECRETKEY);
    if (verified) {
      req["data"] = verified;
      const id = req["data"].id;
      if (id) {
        const user = await User.findById(id);
        if (user) {
          req["data"] = user;
          next();
        } else {
          return res.status(401).json({
            status: 401,
            success: false,
            message: "token has been expired",
            data: [],
          });
        }
      } else {
        return res.status(401).json({
          status: 401,
          success: false,
          message: "Unauthorized user",
          data: [],
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "this is not valid token",
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
};

module.exports = auth;
