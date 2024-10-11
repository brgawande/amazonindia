const Products = require("../schemas/adminProductSchema");

exports.createProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productRating,
    category,
    inStock,
    discount,
    productImages,
    productSpecifications,
  } = req.body;
  try {
    const newProduct = new Products({
      productName,
      productDescription,
      productPrice,
      productRating: productRating || 0,
      category,
      inStock,
      discount: discount || 0,
      productImages,
      productSpecifications,
    });

    const savedProducts = await newProduct.save();

    res.status(200).json({
      success: true,
      message: "Product Created Successfully",
      data: savedProducts,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({});

    return res.status(200).json({
      success: true,
      allProducts,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProducts = async (req, res) => {
  const { id } = req.body;
  try {
    const deleteProduct = await Products.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      sucess: true,
      message: "Product Deleted Successfully",
      deletedProduct: deleteProduct,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productDescription,
    productPrice,
    productRating,
    category,
    inStock,
    discount,
    productImages,
    productSpecifications,
  } = req.body;
  try {
    const selectedProduct = await Products.findByIdAndUpdate(
      id,
      {
        productName,
        productDescription,
        productPrice,
        productRating,
        category,
        inStock,
        discount,
        productImages,
        productSpecifications,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!selectedProduct) {
      return res.status(404).json({
        sucess: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      data: selectedProduct,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
