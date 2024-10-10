const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/deleteuser", deleteUser);

module.exports = router;
