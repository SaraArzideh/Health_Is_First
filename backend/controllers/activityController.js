const Activity = require('../models/activity');

// Get all activities
const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single activity by ID
const getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) return res.status(404).json({ message: 'Activity not found' });
        res.json(activity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new activity
const createActivity = async (req, res) => {
    const newActivity = new Activity({
        userId: req.body.userId,
        date: req.body.date,
        type: req.body.type, // e.g., 'Running', 'Swimming'
        duration: req.body.duration // in minutes
    });

    try {
        const activity = await newActivity.save();
        res.status(201).json(activity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an activity by ID
const updateActivity = async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedActivity) return res.status(404).json({ message: 'Activity not found' });
        res.json(updatedActivity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an activity by ID
const deleteActivity = async (req, res) => {
    try {
        const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
        if (!deletedActivity) return res.status(404).json({ message: 'Activity not found' });
        res.json({ message: 'Activity deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
};