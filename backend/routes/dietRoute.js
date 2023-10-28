// Import required modules
const express = require('express');
const router = express.Router();
const Diet = require('../models/diet');

// Get all diet entries
router.get('/', async (req, res) => {
    try {
        const dietEntries = await Diet.find();
        res.status(200).json(dietEntries);
    } catch (err) {
        console.log("Failed to fetch diet entries. Reason:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Add a new diet entry
router.post('/', async (req, res) => {
    if (!req.body || !req.body.userId || !req.body.date || req.body.caloriesConsumed === undefined) {
        return res.status(400).json({ message: "Bad Request" });
    }

    const dietEntry = new Diet({
        userId: req.body.userId,
        date: req.body.date,
        caloriesConsumed: req.body.caloriesConsumed
    });

    try {
        const newDietEntry = await dietEntry.save();
        res.status(201).json(newDietEntry);
    } catch (err) {
        console.log("Failed to add new diet entry. Reason:", err);
        res.status(400).json({ message: "Failed to save diet entry" });
    }
});

// Delete a specific diet entry based on its ID
router.delete('/:dietId', async (req, res) => {
    try {
        const deletedDietEntry = await Diet.findByIdAndDelete(req.params.dietId);

        if (!deletedDietEntry) {
            return res.status(404).json({ message: "Diet entry not found" });
        }

        res.status(200).json({ message: "Diet entry deleted successfully" });
    } catch (err) {
        console.log("Failed to delete diet entry. Reason:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Edit (update) a specific diet entry based on its ID
router.put('/:dietId', async (req, res) => {
    try {
        const updatedDietEntry = await Diet.findByIdAndUpdate(req.params.dietId, req.body, { new: true });

        if (!updatedDietEntry) {
            return res.status(404).json({ message: "Diet entry not found" });
        }

        res.status(200).json(updatedDietEntry);
    } catch (err) {
        console.log("Failed to update diet entry. Reason:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Export the router for use in the main app
module.exports = router;
