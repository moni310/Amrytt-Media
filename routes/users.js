const router = require("express").Router();
const {
  createUser,
  loginUser,
  viewProfile,
  updateProfile,
  getAllUsers,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.get("/viewProfile", auth, viewProfile);
router.get("/getAllUsers", getAllUsers);
router.put("/updateProfile", auth, updateProfile);

module.exports = router;
