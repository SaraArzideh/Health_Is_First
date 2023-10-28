const Diet = require('../models/diet');

// Add new diet entry
const addDietEntry = async (req, res) => {
    const newDiet = new Diet({
        userId: req.userId,
        calories: req.body.calories,
        date: req.body.date,
        // ... other fields can be added
    });

    try {
        const dietEntry = await newDiet.save();
        res.status(201).json(dietEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all diet entries for a user
const getDietEntries = async (req, res) => {
    try {
        const entries = await Diet.find({ userId: req.userId });
        res.json(entries);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update diet entry
const updateDietEntry = async (req, res) => {
    try {
        const updatedEntry = await Diet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete diet entry
const deleteDietEntry = async (req, res) => {
    try {
        const deletedEntry = await Diet.findByIdAndDelete(req.params.id);
        if (!deletedEntry) throw Error('Entry does not exist');
        res.json({ message: 'Diet entry deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    addDietEntry,
    getDietEntries,
    updateDietEntry,
    deleteDietEntry
};