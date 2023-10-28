const Weight = require('../models/weight');

// Add new weight entry
const addWeightEntry = async (req, res) => {
    const newWeight = new Weight({
        userId: req.userId,
        weight: req.body.weight,
        date: req.body.date,
        // ... other fields can be added
    });

    try {
        const weightEntry = await newWeight.save();
        res.status(201).json(weightEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all weight entries for a user
const getWeightEntries = async (req, res) => {
    try {
        const entries = await Weight.find({ userId: req.userId });
        res.json(entries);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update weight entry
const updateWeightEntry = async (req, res) => {
    try {
        const updatedEntry = await Weight.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete weight entry
const deleteWeightEntry = async (req, res) => {
    try {
        const deletedEntry = await Weight.findByIdAndDelete(req.params.id);
        if (!deletedEntry) throw Error('Entry does not exist');
        res.json({ message: 'Weight entry deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    addWeightEntry,
    getWeightEntries,
    updateWeightEntry,
    deleteWeightEntry
};