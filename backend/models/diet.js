const mongoose= require ('mongoose');

const dietSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    todayDiet: Number
});

module.exports= mongoose.model('Diet', dietSchema);