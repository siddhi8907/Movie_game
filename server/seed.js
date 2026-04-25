const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Puzzle = require('./models/Puzzle');

//for debug
console.log("--- DEBUG START ---");
console.log("Puzzle variable contains:", Puzzle);
console.log("Is it a function/model?:", typeof Puzzle);
console.log("Does deleteMany exist?:", typeof Puzzle.deleteMany);
console.log("--- DEBUG END ---");

dotenv.config();

const puzzles = [
  // EASY
  { description: "A billionaire beats up the mentally ill while wearing a rubber suit.", answer: "The Dark Knight", difficulty: "Easy", hint: "I'm Batman." },
  { description: "A long-distance relationship fails because of a very large ice cube.", answer: "Titanic", difficulty: "Easy", hint: "Near, far, wherever you are..." },
  { description: "An elderly man kidnaps a child using high-altitude balloons to avoid a nursing home.", answer: "Up", difficulty: "Easy", hint: "Squirrel!" },
  { description: "A group of coworkers spend way too much time in a basement together.", answer: "Fight Club", difficulty: "Easy", hint: "First rule: Don't talk about it." },
  { description: "A boy discovers he has a very high utility bill because he lives under the stairs.", answer: "Harry Potter", difficulty: "Easy", hint: "Yer a wizard, Harry." },
  
  // MEDIUM
  { description: "A farm boy gets radicalized by a desert hermit and blows up a government facility.", answer: "Star Wars", difficulty: "Medium", hint: "May the Force be with you." },
  { description: "A chef discovers that a rodent is responsible for his career success.", answer: "Ratatouille", difficulty: "Medium", hint: "Anyone can cook." },
  { description: "A guy takes a nap and dreams about taking another nap inside that nap.", answer: "Inception", difficulty: "Medium", hint: "A spinning top." },
  { description: "A man’s life is ruined because he picked up a weird-looking ring on a hike.", answer: "Lord of the Rings", difficulty: "Medium", hint: "My Precious." },
  { description: "A businessman finds out that his world is actually just a giant computer screensaver.", answer: "The Matrix", difficulty: "Medium", hint: "Red pill or blue pill?" },

  // HARD
  { description: "A man gets very upset about a rug and ends up involved in a kidnapping plot he doesn't understand.", answer: "The Big Lebowski", difficulty: "Hard", hint: "The Dude abides." },
  { description: "A woman goes to a gas station and spends the rest of the movie regretting it.", answer: "No Country for Old Men", difficulty: "Hard", hint: "Flip a coin." },
  { description: "A family’s vacation is ruined by a very persistent noise and some tall grass.", answer: "In the Tall Grass", difficulty: "Hard", hint: "Based on a Stephen King story." },
  { description: "Two men sit in a lighthouse and slowly realize they hate each other's cooking.", answer: "The Lighthouse", difficulty: "Hard", hint: "Hark, Triton, hark!" },
  { description: "A teacher is so mean to his student that the student becomes a world-class drummer just to spite him.", answer: "Whiplash", difficulty: "Hard", hint: "Not quite my tempo." }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Checking Puzzle Model:", typeof Puzzle.deleteMany);
    await Puzzle.deleteMany({}); // Clears the DB first
    await Puzzle.insertMany(puzzles);
    console.log("Puzzles Loaded in the DB");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedDB();