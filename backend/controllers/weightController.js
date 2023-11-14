const Weight = require('../models/weight');
const User = require ('../models/user');


// Update weight entry
const updateWeight = async (req, res) => {
    const currentWeight = req.body;
    const userId = req.user._id;

    try {
        // Find the user and update their current weight and push the new weight to the weight history 
        const updatedUser= await User.findByIdAndUpdate(
            userId,
            {
            $set:{currentWeight: currentWeight}, 
            $push: {weightHistory:{newCurrentWeight: currentWeight,date: new Date()}}
            },
            {new:true}
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.log("Failed to update weight entry. Reason:", error);
        res.status(500).json({ message: "Error updating weight" });
    }
};

const getWeightHistory = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
  
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        } 
  
        // Map through the weight history to calculate BMI for each entry
        const weightHistoryWithBMI = user.weightHistory.map(entry => {
          const bmi = calculateBMI(entry.Weight, user.height);
          return { ...entry.toObject(), bmi };
        });
  
        res.json(weightHistoryWithBMI);
    } catch (error) {
        console.log("Failed to get weight history. Reason:", error);
        res.status(500).json({ message: 'Error fetching weight history' });
      }
};
const calculateBMI = (weight, height) => {
    return (weight / ((height / 100) ** 2)).toFixed(1);
};

/*
// Add new weight entry
const addWeight = async (req, res) => {
    const newCurrentWeight = new Weight({
        userId: req.userId,
        currentWeight: req.body.currentWeight,
        date: req.body.date,
    });

    try {
        const currentWeight = await newCurrentWeight.save();
        res.status(201).json(currentWeight);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all weight entries for a user
const getWeight = async (req, res) => {
    try {
        const entries = await Weight.find({ userId: req.userId });
        res.json(entries);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete weight entry
const deleteWeight = async (req, res) => {
    try {
        const deletedEntry = await Weight.findByIdAndDelete(req.params.id);
        if (!deletedEntry) throw Error('Entry does not exist');
        res.json({ message: 'Weight entry deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
*/
module.exports = {
    updateWeight,
    getWeightHistory
};