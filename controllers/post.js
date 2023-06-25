const { Post, deleteRequest } = require("../models/posts");
const User = require("../models/users");


// create post 
const createPost = async (req, res) => {
  try {
    const { DR, PA, DA } = req.body;
    if (req["data"].isAdmin === true) {
      Post.create({ DR, PA, DA, userId: req["data"].id })
        .then((post) => {
          if (post) {
            return res.status(200).json({
              status: 200,
              success: true,
              message: "post created successfully",
            });
          } else {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "unable to create post",
            });
          }
        })
        .catch((error) => {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "unable to create post",
            error: error,
          });
        });
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "you are not allowed to create a post only admins can create",
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

// Update  post
const updatePost = async (req, res) => {
  try {
    const { DR, PA, DA } = req.body;
    const { id } = req.query;
    if (req["data"].isAdmin === true) {
      const post = await Post.findById(id);
      if (post) {
        Post.findByIdAndUpdate(
          id,
          {
            DR: DR ? DR : post.DR,
            PA: PA ? PA : post.PA,
            DA: DA ? DA : post.DA,
            userId: req["data"].id,
          },
          { new: true }
        )
          .then((post) => {
            if (post) {
              return res.status(200).json({
                status: 200,
                success: true,
                message: "post updated successfully",
              });
            } else {
              return res.status(400).json({
                status: 400,
                success: false,
                message: "unable to update post",
              });
            }
          })
          .catch((error) => {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "unable to update post",
              error: error,
            });
          });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to find post with id ",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "you are not allowed to create a post only admins can create",
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


// find the post
const getPosts = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      Post.findById(id)
        .then((post) => {
          if (post) {
            return res.status(200).json({
              status: 200,
              success: true,
              message: "all posts",
              data: post,
            });
          } else {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "unable to find post",
            });
          }
        })
        .catch((error) => {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "unable to find post",
          });
        });
    } else {
      Post.find()
        .then((post) => {
          if (post) {
            return res.status(200).json({
              status: 200,
              success: true,
              message: "all posts",
              data: post,
            });
          } else {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "unable to find post",
            });
          }
        })
        .catch((error) => {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "unable to find post",
          });
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


// admin can delete posts
const deletePosts = async (req, res) => {
  try {
    const { id } = req.query;
    if (req["data"].isAdmin === true) {
      Post.findByIdAndDelete(id)
        .then((post) => {
          if (post) {
            return res.status(200).json({
              status: 200,
              success: true,
              message: "post deleted successfully",
            });
          } else {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "unable to delete post",
            });
          }
        })
        .catch((error) => {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "unable to delete post",
            error: error,
          });
        });
    } else {
      if (req["data"].haveDeleteRights === true) {
        Post.findByIdAndDelete(id)
          .then((post) => {
            if (post) {
              return res.status(200).json({
                status: 200,
                success: true,
                message: "post deleted successfully",
              });
            } else {
              return res.status(400).json({
                status: 400,
                success: false,
                message: "unable to delete post",
              });
            }
          })
          .catch((error) => {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "unable to delete post",
              error: error,
            });
          });
      } else {
        const post = await Post.findById(id);
        deleteRequest
          .create({ adminId: post.userId, userId: req["data"].id })
          .then((response) => {
            if (response) {
              return res.status(200).json({
                status: 200,
                success: true,
                message: "request was successful send to admin",
              });
            } else {
              return res.status(400).json({
                status: 400,
                success: false,
                message: "unable to send request to admin",
              });
            }
          })
          .catch((error) => {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "unable to send request to admin",
            });
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


// admin can approve the request to delete the post for the user
const approveDeleteRequest = async (req, res) => {
  const { userId } = req.query;
  try {
    if (req["data"].isAdmin === true) {
      User.findByIdAndUpdate(userId, { haveDeleteRights: true }, { new: true })
        .then((response) => {
          if (response) {
            return res.status(200).json({
              status: 200,
              success: true,
              message: "delete request has been approved successfully",
            });
          } else {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "unable to approve delete request",
            });
          }
        })
        .catch((error) => {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "unable to approve delete request",
            error: error,
          });
        });
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: " you are not allowed to get this details",
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


// admin can the all delete request
const getAllDeleteRequest = async (req, res) => {
  try {
    if (req.data.isAdmin) {
      const deleteRequests = await deleteRequest
        .find({ adminId: req.data.id })
        .populate("userId");
      if (deleteRequests.length > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "Delete requests retrieved successfully",
          data: deleteRequests,
        });
      } else {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "No delete requests found",
        });
      }
    } else {
      return res.status(403).json({
        status: 403,
        success: false,
        message: "You are not authorized to access this information",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


module.exports = {
  createPost,
  updatePost,
  deletePosts,
  getPosts,
  approveDeleteRequest,
  getAllDeleteRequest,
};
