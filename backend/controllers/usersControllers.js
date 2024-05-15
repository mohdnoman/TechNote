const User = require("../models/Users");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")

// @desc Get ALL users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").lean()
    if (!users.length) {
        return res.status(400).json({ message: "No users found" })
    }
    res.json(users)
})

// @desc Create new users
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body
    //Confirm data
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    //Check for Duplicate
    const duplicate = await User.findOne({ username }).collation({ local: "en", strength: 2 }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hashedPwd }
        : { username, "password": hashedPwd, roles }

    // Create and store new user
    const user = await User.create(userObject)
    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: "Invalid user data received" })
    }
})

// @desc Update a users
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    //confirm
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== "boolean") {
        return res.status(400).json({ message: "All fields are required" })
    }
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).collation({ local: "en", strength: 2 }).lean().exec()
    // Allow update to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate username" })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10)   //Salt rounds
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a users
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: "User ID Required " })
    }

    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: "User had assigned notes" })
    }

    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const result = await User.deleteOne()
    const reply = `Username ${result.username} with ID ${result.id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}