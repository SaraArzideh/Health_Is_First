// Import required modules
const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');

// Create a new activity
router.post('/', async (req, res) => {
    // Check if the request body exists
    if (!req.body || !req.body.type) {
        return res.status(400).json({ "Message": "Bad Request" });
    }

    try {
        // Create a new Activity instance using properties from the request body
        const newActivity = new Activity({
            "type": req.body.type,
            "date": req.body.date,
            "duration": req.body.duration,
            "user": req.session.user
        });
        // Save the new activity to the database
        await newActivity.save();

        // Send the saved activity with a 201 Created status
        res.status(201).send(newActivity);
    } catch (error) {
        console.log("Failed to add new activity. Reason:", error);
        res.status(500).send(error.message);
    }
});

// Get activities by userId
router.get('/user/:userId', async (req, res) => {
    try {
        // Fetch activities from the database that match the provided userId
        const activities = await Activity.find({ userId: req.params.userId });

        // Send the fetched activities with a 200 OK status
        res.status(200).send(activities);
    } catch (error) {
        console.log("Failed to fetch activities. Reason:", error);
        res.status(500).send(error.message);
    }
});

// Delete activities by userId
router.delete('/user/:userId', async (req, res) => {
    try {
        // Remove activities from the database that match the provided userId
        await Activity.deleteMany({ userId: req.params.userId });

        // Send a success message with a 200 OK status
        res.status(200).send({ "Message": "Activities deleted successfully" });
    } catch (error) {
        console.log("Failed to delete activities. Reason:", error);
        res.status(500).send(error.message);
    }
});

// Edit activities by userId (Updating an activity by its activityId and userId)
router.put('/user/:userId/:activityId', async (req, res) => {
    try {
        // Update the activity in the database that matches the provided userId and activityId
        const updatedActivity = await Activity.findOneAndUpdate(
            { userId: req.params.userId, _id: req.params.activityId },
            req.body,
            { new: true } // To ensure that the updated document is returned
        );

        // If the activity doesn't exist, send a 404 Not Found status
        if (!updatedActivity) {
            return res.status(404).send({ "Message": "Activity not found" });
        }

        // Send the updated activity with a 200 OK status
        res.status(200).send(updatedActivity);
    } catch (error) {
        console.log("Failed to update activity. Reason:", error);
        res.status(500).send(error.message);
    }
});

// Export the router for use in the main app
module.exports = router;
