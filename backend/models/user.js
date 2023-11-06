const mongoose= require ('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    password: String,
    email: String,
    height: Number,
    weight: Number,
    age: Number,
    goals: {
        activity: Number,
        diet: Number
    }
});

module.exports = mongoose.model('User',userSchema);