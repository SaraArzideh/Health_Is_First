const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser
} = require('../controllers/userController');

// User Registration route
router.post('/register', registerUser);

// User Login route
router.post('/login', loginUser);

// Using authMiddleware to protect routes that require authentication
// Route to fetch user profile
router.get('/profile', authMiddleware, getUserProfile);
    
// Route to update user profile
router.put('/goals/:userId', authMiddleware, updateUserProfile);

// Route to delete User
router.delete('/profile', authMiddleware, deleteUser);    

module.exports = router;
