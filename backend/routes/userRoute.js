const express = require('express');
const router = express.Router();
const {isUserLogged} = require ('../middleware/authMiddleware');
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
router.get('/profile', isUserLogged, getUserProfile);
    
// Route to update user profile
router.put('/goals/:userId', isUserLogged, updateUserProfile);

// Route to delete User
router.delete('/profile', isUserLogged, deleteUser);    

module.exports = router;
