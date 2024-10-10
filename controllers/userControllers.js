const User = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exsistingUser = await User.findOne({ email });

    if (!exsistingUser) {
      return res.status(400).json({
        success: false,
        message: "Email Not Found",
      });
    }

    // password compare karo
    const isValidPassword = await bcrypt.compare(
      password,
      exsistingUser.password
    );
    if (!isValidPassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // password valid ho gaya abb token generate karo
    const token = jwt.sign(
      {
        userId: exsistingUser._id,
        email: exsistingUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // save token in sessionstorage from cklients side

    // console.log(token);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: exsistingUser._id,
        email: exsistingUser.email,
        name: exsistingUser.name,
        email: exsistingUser.email,
        phone: exsistingUser.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logout functionality usally p[erformed on client side]

exports.logoutUser = async (req, res) => {
  try {
    res.status(200).json({
      sucess: true,
      message: "LoggedOut Successfully",
    });
  } catch (error) {
    res.status(500).json({
      sucecss: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const exsistingUser = await User.findOne({ email });
    if (!exsistingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    await exsistingUser.deleteOne();
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
