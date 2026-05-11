const express = require('express');
const router = express.Router();

const Puzzle = require('../models/Puzzle');
const User = require('../models/user');
const auth = required('auth');

router.get('/random', auth, async(req,res)=>
{
    try{
        const { difficulty }= req.query;

        //to get the current user's data
        //including all the puzzles he has solved so we don't repeat them
        const user = await User.findById(req.user);

        let query = { _id: { $nin: user.solved_puzzles}};

        if (difficulty) {
      query.difficulty = difficulty;
    }

    const puzzles= await Puzzle.find(query);

    if (puzzles.length === 0) {
      return res.status(404).json({ msg: "You've solved everything in this category!" });
    }

    //return a random puzzle from the list
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    res.json(randomPuzzle);
    }
    catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post('/solve', auth, async (req, res) => {
  try {
    const { puzzleId } = req.body;
    const user = await User.findById(req.user);

    // If the puzzle isn't already in the solved list, add it
    if (!user.solvedPuzzles.includes(puzzleId)) {
      user.solvedPuzzles.push(puzzleId);
      await user.save();
    }

    res.json({ msg: "Progress saved!" });
  } catch (err) {
    res.status(500).json({msg: "Server Error"});
  }
});

module.exports = router;