const { required } = require('joi');
const mongoose = require('mongoose');

const PuzzleSchema = new mongoose.Schema({
    description: {
        type: String, required:true
    },
    answer:{
        type: String, required: true
    },
    difficulty:{
        type: String, enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium',
        required: true
    },
    hint:{
        type: String, required: true
    }
});

module.exports = mongoose.model('Puzzle', PuzzleSchema);