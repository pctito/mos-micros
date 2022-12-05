import asyncHandler from 'express-async-handler'
import { User } from '../models/Users.js'
import * as bcrypt from 'bcrypt'

/*
@desc Get users
@route GET /users
@access private
*/
const getAllUsers = asyncHandler(async (_req, res) => {
    const users = await User.find().select('-password').lean()

    if (!users?.length) {
        return res.status(404),json({ message: 'No users found.' })
    }

    res.send(users)

});


/*
@desc Update user
@route PUT /users
@access private
*/
const updateUser = asyncHandler(async (req, res) => {


    const { id, username, email, password } = req.body

    if (!id, !username) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const user = await User.findById(id).exec()
    
    if (!user) {
        return res.status(400).json({ message: 'User not found.' })
    }

    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Username already exists.' })
    }

    user.username = username
    user.email = email

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated.`})

});


/*
@desc Create user
@route POST /users
@access private
*/
const createUser = asyncHandler(async (req, res) => {


    const { username, email, password } = req.body
    if ( !username || !email || !password ) {
        return res.status(400).json({ message: 'All fields are required.' })
    }
    

    // Check if username already exists in database
    const duplicate = await User.findOne({ username }).lean().exec()
    if ( duplicate ) {
        return res.status(404).json({ message: 'Username already exists.' })
    }


    // Hash password
    const hashedPass = await bcrypt.hash(password, 10) // 10 salt rounds
    const userObject = {
        username, 
        email, 
        'password': hashedPass
    }


    // Create & store new user
    const user = await User.create(userObject)
    if (user) {
        res.status(201).json({ message: `New user, ${username}, successfully created!` })
    } else {
        res.status(400).json({ message: 'Invlaid user data received' })
    }

});


/*
@desc Delete user
@route DELETE /users
@access private
*/
const deleteUser = asyncHandler(async (req, res) => {


    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'User ID required' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()
    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
    
});


export {

    getAllUsers,
    updateUser,
    createUser,
    deleteUser

}