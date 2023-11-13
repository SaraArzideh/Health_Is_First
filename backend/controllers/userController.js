// CRUD for user profile, user registration and user login

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

// User Registration
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        age: req.body.age,
        height:req.body.height,
        currentWeight:req.body.currentWeight,
        gender: req.body.gender,
        activityLevel:req.body.activityLevel,
        exceptionalSituation : req.body.exceptionalSituation,
        activityGoal:req.body.activityGoal,
    });

    try {
        const savedUser = await newUser.save();
        //Respond with the new user data but exclude the password
        res.status(201).json({ user: savedUser.toObject({ getters: true, virtuals: false }) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: ' User does not exist' });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header('auth-token', token).json({ token, user: { 
            id: user._id,
            username: user.username,
            email: user.email,
            height: user.height,
            age: user.age,
            currentWeight: user.currentWeight,
            activityGoal: user.activityGoal,
            gender: user.gender,
            exceptionalsituation:user.exceptionalSituation,
            activityLevel:user.activityLevel,
            optimalDiet: user.optimalDiet,
            bmi: user.bmi,
            todayDiet: user.todayDiet,
            activities: user.activities
        }  
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // Exclude password
        if (!user) throw Error('User not found');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Server error'});
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, { new: true }).select('-password');
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message:'Server error' });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.userId);
        if (!deletedUser) throw Error('User does not exist');
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser
};