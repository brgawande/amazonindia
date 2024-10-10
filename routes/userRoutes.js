const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  updateUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.delete("/deleteuser", deleteUser);
router.put("/updateuser", updateUser);

module.exports = router;
