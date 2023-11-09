// CRUD for user profile, user registration and user login

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

// User Registration
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password: hashedPassword,
        activityGoal:req.body.activityGoal,
        dietGoal:req.body.dietGoal,
        currentWeight:req.body.currentWeight,
        height:req.body.height,
        age: req.body.age
    });

    try {
        const savedUser = await newUser.save();
        //Respond with the new user data but exclude the password
        res.status(201).json({ user: savedUser.toObject({ getters: true, virtuals: false }) });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare passwords
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid credentials' });

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.header('auth-token', token).json({ token, user: { 
        id: user._id,
        username: user.username,
        email: user.email,
        height: user.height,
        currentWeight: user.currentWeight,
        age: user.age,
        activityGoal: user.activityGoal,
        dietGoal: user.dietGoal,
        bmi: user.bmi
    }  });
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // Exclude password
        if (!user) throw Error('User does not exist');
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.userId);
        if (!deletedUser) throw Error('User does not exist');
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser
};