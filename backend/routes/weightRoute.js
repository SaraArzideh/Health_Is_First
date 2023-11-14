// Import required modules
const express = require('express');
const router = express.Router();
const {updateWeight, getWeightHistory} = require ('../controllers/weightController')
const {isUserLogged} = require ('../middleware/authMiddleware');

// Update the currentWeight and add to weight history
//router.post('/weight',isUserLogged, addWeight);
router.put('/weight',isUserLogged, updateWeight);

router.get('/weight/history', isUserLogged, getWeightHistory);

//router.get('/weight', isUserLogged, getWeight);

//router.delete('/weight/:id', isUserLogged, deleteWeight);

// Export the router for use in the main app
module.exports = router;
