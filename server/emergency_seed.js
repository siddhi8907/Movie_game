const mongoose = require('mongoose');
const Puzzle = require('./models/Puzzle'); 
require('dotenv').config();

const data = [
  { description: "A billionaire with daddy issues fights a clown in a suit.", answer: "The Dark Knight", difficulty: "Medium", hint: "I'm Batman" },
  { description: "A dream within a dream within a dream... wait, where are we?", answer: "Inception", difficulty: "Hard", hint: "The top keeps spinning" },
  { description: "An ogre finds out that onions and people have layers.", answer: "Shrek", difficulty: "Easy", hint: "Far Far Away" }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Puzzle.insertMany(data);
    console.log("DATA INJECTED! REFRESH THE BROWSER.");
    process.exit();
  }).catch(err => console.log(err));