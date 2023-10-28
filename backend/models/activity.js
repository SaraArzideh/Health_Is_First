const mongoose = require ('mongoose');

const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    activityType: String,
    duration: Number
});

module.exports = mongoose.model('Activity', activitySchema);
