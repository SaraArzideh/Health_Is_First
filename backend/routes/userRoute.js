const express = require('express');
const router = express.Router();
const User = require('../models/user');

// User Registration
router.post('/register', async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ message: "Bad Request: Missing required fields." });
    }

    const newUser = new User(req.body);

    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        console.log("Failed to register new user. Reason:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Authenticate a user or User Login
router.post('/login', async (req, res) => {
    console.log(" Login route hit with body:", req.body);  //to make sure that server's route is being hit!
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Bad Request: Email and password required." });
    }

    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }
        // Ideally, generate a token or set session here (not shown in this basic example)
        res.status(200).send(user);
    } catch (error) {
        console.log("Failed to log in. Reason:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetching User Profile Data
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        console.log("Failed to fetch user profile. Reason:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Updating user goals
router.put('/goals/:userId', async (req, res) => {
    if (!req.body.date || !req.body.duration || req.body.caloriesConsumed === undefined) {
        return res.status(400).json({ message: "Bad Request: Missing required fields." });
    }

    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.goals = {
            date: req.body.date,
            activityType: req.body.activityType,
            duration: req.body.duration,
            caloriesConsumed: req.body.caloriesConsumed
        };

        await user.save();
        res.status(200).send(user);
    } catch (error) {
        console.log("Failed to update user goals. Reason:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
