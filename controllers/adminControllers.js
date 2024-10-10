const User = require("../schemas/userSchema");

exports.getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find({});

    res.status(200).json({
      success: true,
      allUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
