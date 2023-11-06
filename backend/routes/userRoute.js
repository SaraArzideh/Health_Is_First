const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser}= require('../controllers/userController');
const User = require('../models/user');

// User Registration route
router.post('/register', registerUser);

// User Login route
router.post('/login', loginUser);

// Fetching User Profile Data route
router.get('/:userId', getUserProfile);
    
// Updating user goals route
router.put('/goals/:userId', updateUserProfile);

// Deleting User route
router.delete(':userId', deleteUser);    

module.exports = router;
