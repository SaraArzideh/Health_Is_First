const mongoose= require ('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    height: Number,
    weight: Number,
    dateOfBirth: Date,
    goals: {
        activity: Number,
        diet: Number
    }
});

module.exports = mongoose.model('User',userSchema);