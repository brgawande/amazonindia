const User = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { name, email, password, address, dob, phone } = req.body;
  try {
    const exsitingUser = await User.findOne({ email });

    if (exsitingUser) {
      return res.status(400).json({
        sucess: false,
        message: "Email Already Exists",
      });
    }

    //   we will hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //   create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      dob,
      phone,
    });

    //   abb new user create karne ke baad usko save kar lo
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered SUccessfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
