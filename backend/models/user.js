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
    gender: String,
    exceptionalSituation: {
        type: Boolean,
        required: true,
        default: false
    },
    activityLevel: String,
    todayDiet: Number
});

module.exports = mongoose.model('User',userSchema);