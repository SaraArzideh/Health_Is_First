const mongoose= require ('mongoose');

const weightSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    weight: Number,
    height: Number
});

module.exports= mongoose.model('Weight', weightSchema);