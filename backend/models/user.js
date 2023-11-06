const mongoose= require ('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    password: String,
    email: String,
    height: Number,
    currentWeight: Number,
    age: Number,
    activityGoal: Number,
    dietGoal: Number
});

module.exports = mongoose.model('User',userSchema);