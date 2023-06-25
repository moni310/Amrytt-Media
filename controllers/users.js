const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Admin and user can create their profile
const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, isAdmin } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "please fill all the details ",
      });
    }
    if (password.length < 6 || password.length > 12) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "password should 6 digit min and 12 digit maximum",
      });
    }
    const lowEmail = email.toLowerCase();
    User.findOne({ email: lowEmail })
      .then(async (response) => {
        if (response) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "this user is alredy exist ",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          const newUser = new User({
            name: name,
            email: lowEmail,
            phone: phone,
            password: hash,
            isAdmin: isAdmin ? true : false,
            haveDeleteRights: isAdmin ? true : false,
          });
          await newUser.save();
          if (isAdmin) {
            return res.status(201).json({
              status: 201,
              success: true,
              message: "admin registerd successfully",
            });
          } else {
            return res.status(201).json({
              status: 201,
              success: true,
              message: "user registerd successfully",
            });
          }
        }
      })
      .catch((error) => {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to create user ",
          error: error,
        });
      });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
};



// Admin and user can login to their profile
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email !== undefined && email !== "") {
      if (!email || !password) {
        return res.status(400).send({
          success: false,
          message: "Please enter both email and password",
        });
      }
      const emailId = email.toLowerCase();
      const user = await User.findOne({
        email: emailId,
      });
      if (!user) {
        return res.status(404).send({
          status: 404,
          success: false,
          message: "user with this email not found",
        });
      }

      const hashPassword = user.password;
      const compare = await bcrypt.compare(password, hashPassword);
      if (!compare) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Incorrect password",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: email,
          isAdmin: user.isAdmin,
          haveDeleteRights: user.haveDeleteRights,
        },
        process.env.JWTSECRETKEY,
        { expiresIn: "7d" }
      );
      return res.send({
        status: 200,
        success: true,
        message: "user successfully signed in.",
        user,
        token,
      });
    } else {
      return res.status(400).send({
        status: 400,
        success: false,
        message: "Please provide valid email",
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// if admin or user login then can see their profile
const viewProfile = async (req, res) => {
  const { _id } = req["data"];
  try {
    User.findById(_id)
      .then((response) => {
        if (!response) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "unable to find user",
          });
        } else {
          return res.status(200).json({
            status: 200,
            success: true,
            message: "user information",
            data: response,
          });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to find user",
          error: error,
        });
      });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
};


// if admin or user login then can update their profile
const updateProfile = async (req, res) => {
  try {
    const { _id } = req["data"];
    const { name, email, password, phone } = req.body;
    if (password) {
      if (password.length < 6 || password.length > 12) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "password should 6 digit min and 12 digit maximum",
        });
      }
      const salt = await bcrypt.genSalt(10);
      var newPassword = await bcrypt.hash(password, salt);
    }
    const user = await User.findById(_id);

    User.findByIdAndUpdate(
      _id,
      {
        name: name ? name : user.name,
        email: email ? email.toLowerCase() : user.email,
        phone: phone ? phone : user.phone,
        password: password ? newPassword : user.password,
      },
      { new: true }
    )
      .then((response) => {
        if (response) {
          return res.status(200).json({
            status: 200,
            success: true,
            message: "user profile updated successfully",
          });
        } else {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "unable to update user profile",
          });
        }
      })
      .catch(async (err) => {
        return res.status(400).json({
          status: 400,
          success: false,
          error: err,
          message: "unable to update user profile",
        });
      });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
};


// can see the particular user profile or all as well as
const getAllUsers = async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      const user = await User.findById(id);
      if (user) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "user by id",
          data: user,
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to find user",
        });
      }
    } else {
      const user = await User.find();
      if (user) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "all users",
          data: user,
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to find users",
        });
      }
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

module.exports = {
  createUser,
  loginUser,
  viewProfile,
  updateProfile,
  getAllUsers,
};
