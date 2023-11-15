// CRUD for user profile, registration and login

const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

// User Registration
const registerUser = async (req, res) => {
    const { username, email, password, age, height, currentWeight, gender, activityLevel, exceptionalSituation, activityGoal } = req.body;


    if (!username || !email || !password || !age || !height || !currentWeight) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        age,
        height,
        currentWeight,
        gender,
        activityLevel,
        exceptionalSituation,
        activityGoal,
    });

    try {
        const savedUser = await newUser.save();
        // exclude the password from the response
        const userResponse = savedUser.toObject();
        delete userResponse.password;
        res.status(201).json({ user: userResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
        // Validate request
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
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
        const user = await User.findById(req.userId); // req.userId is set by the auth middleware

        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.height = req.body.height || user.height;
            user.currentWeight = req.body.currentWeight || user.currentWeight;
            user.age = req.body.age || user.age;
            user.activityGoal = req.body.activityGoal || user.activityGoal;
            user.gender = req.body.gender || user.gender;
            user.exceptionalSituation = req.body.exceptionalSituation || user.exceptionalSituation;
            user.activityLevel = req.body.activityLevel || user.activityLevel;
    
            if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 10);
            }
    
            const updatedUser = await user.save();
            res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            height: updatedUser.height,
            age: updatedUser.age,
            currentWeight: updatedUser.currentWeight,
            activityGoal: updatedUser.activityGoal,
            gender: updatedUser.gender,
            exceptionalsituation:updatedUser.exceptionalSituation,
            activityLevel:updatedUser.activityLevel,
            todayDiet: updatedUser.todayDiet,
            activities: updatedUser.activities
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*
        const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, { new: true }).select('-password');
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message:'Server error' });
    }
};
*/

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