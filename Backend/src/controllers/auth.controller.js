const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")

/**
 * REGISTER
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password"
    })
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }]
  })

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "Account already exists"
    })
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await userModel.create({
    username,
    email,
    password: hash
  })

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

/**
 * LOGIN (NO COOKIE / NO TOKEN)
 */
async function loginUserController(req, res) {
  const { email, password } = req.body

  const user = await userModel.findOne({ email })

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password"
    })
  }

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

/**
 * LOGOUT (simple)
 */
async function logoutUserController(req, res) {
  res.status(200).json({
    success: true,
    message: "User logged out"
  })
}

/**
 * GET ME (no auth)
 */
async function getMeController(req, res) {
  res.status(200).json({
    success: true,
    message: "No auth mode",
    user: null
  })
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController
}