const express = require("express");
const {
  createProduct,
  getAllProducts,
  deleteProducts,
  updateProduct,
} = require("../controllers/adminProductControllers");

const router = express.Router();

router.post("/createproduct", createProduct);
router.get("/getallproducts", getAllProducts);
router.delete("/deleteproduct", deleteProducts);
router.put("/updateproduct/:id", updateProduct);

module.exports = router;
