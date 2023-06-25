const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePosts,
  getPosts,
  approveDeleteRequest,
  getAllDeleteRequest,
} = require("../controllers/post");
const auth = require("../middlewares/auth");

router.post("/createPost", auth, createPost);
router.put("/updatePost", auth, updatePost);
router.delete("/deletePosts", auth, deletePosts);
router.get("/getPosts", auth, getPosts);
router.put("/approveDeleteRequest", auth, approveDeleteRequest);
router.get("/getAllDeleteRequest", auth, getAllDeleteRequest);

module.exports = router;
