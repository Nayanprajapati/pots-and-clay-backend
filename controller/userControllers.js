// const userModel = require("../models/userModels");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // Function to generate hashed password using bcrypt
// async function hashPassword(password) {
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   return hashedPassword;
// }

// // Function to validate password using bcrypt
// async function validPassword(password, hash) {
//   return await bcrypt.compare(password, hash);
// }

// const createUser = async (req, res) => {
//   console.log("Create user api hit");
//   const { firstName, lastName, email, password } = req.body;

//   // Validation
//   if (!firstName || !lastName || !email || !password) {
//     return res.json({
//       success: false,
//       message: "Please enter all fields!",
//     });
//   }

//   try {
//     // Check if the user already exists
//     const existingUser = await userModel.findOne({ email: email });
//     if (existingUser) {
//       return res.json({
//         success: false,
//         message: "User Already Exists!",
//       });
//     }

//     // Generate hashed password
//     const hashedPassword = await hashPassword(password);

//     // Save the user in the database
//     const newUser = new userModel({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     console.log("Create user api success");

//     // Send the success response
//     res.json({
//       userData: newUser,
//       success: true,
//       message: "User Created Successfully!",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Internal Server Error!",
//     });
//   }
// };

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   // Validation
//   if (!email || !password) {
//     return res.json({
//       success: false,
//       message: "Please enter all fields!",
//     });
//   }

//   try {
//     // Find user by email
//     const user = await userModel.findOne({ email: email });
//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User Not Found!",
//       });
//     }

//     // Validate the password
//     const isMatch = await validPassword(password, user.password);
//     if (!isMatch) {
//       return res.json({
//         success: false,
//         message: "Incorrect Password!",
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, is_admin: user.isAdmin },
//       process.env.JWT_SECRET,
//       { expiresIn: "2h" } // Token expires in 1 hour
//     );

//     // Send the token, userData, and success message to the user
//     res.json({
//       success: true,
//       message: "Login Successful!",
//       token: token,
//       userData: user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Internal Server Error!",
//     });
//   }
// };

// module.exports = {
//   createUser,
//   loginUser,
// };
