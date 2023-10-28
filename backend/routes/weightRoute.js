// Import required modules
const express = require('express');
const router = express.Router();
const Weight = require('../models/weight');

// Get all weight entries
router.get('/', async (req, res) => {
    try {
        const weightEntries = await Weight.find();
        res.status(200).json(weightEntries);
    } catch (err) {
        console.log("Failed to fetch weight entries. Reason:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Add a new weight entry
router.post('/', async (req, res) => {
    if (!req.body || !req.body.userId || !req.body.date || req.body.weight === undefined || req.body.height === undefined) {
        return res.status(400).json({ message: "Bad Request" });
    }

    const weightEntry = new Weight({
        userId: req.body.userId,
        date: req.body.date,
        weight: req.body.weight,
        height: req.body.height
    });

    try {
        const newWeightEntry = await weightEntry.save();
        res.status(201).json(newWeightEntry);
    } catch (err) {
        console.log("Failed to add new weight entry. Reason:", err);
        res.status(400).json({ message: "Failed to save weight entry" });
    }
});

// Delete a specific weight entry based on its ID
router.delete('/:weightId', async (req, res) => {
    try {
        const deletedWeightEntry = await Weight.findByIdAndDelete(req.params.weightId);

        if (!deletedWeightEntry) {
            return res.status(404).json({ message: "Weight entry not found" });
        }

        res.status(200).json({ message: "Weight entry deleted successfully" });
    } catch (err) {
        console.log("Failed to delete weight entry. Reason:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Edit (update) a specific weight entry based on its ID
router.put('/:weightId', async (req, res) => {
    try {
        const updatedWeightEntry = await Weight.findByIdAndUpdate(req.params.weightId, req.body, { new: true });

        if (!updatedWeightEntry) {
            return res.status(404).json({ message: "Weight entry not found" });
        }

        res.status(200).json(updatedWeightEntry);
    } catch (err) {
        console.log("Failed to update weight entry. Reason:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Export the router for use in the main app
module.exports = router;
