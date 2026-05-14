const express = require('express');
const router = express.Router();
const Puzzle = require('../models/Puzzle');
const User = require('../models/user');
const auth = require('../routes/auth'); 

router.get('/random', auth, async (req, res) => {
    try {
        const { difficulty } = req.query;
        const user = await User.findById(req.user.userId); 

        // Fallback to empty array if field doesn't exist yet
        const solvedList = user.solvedPuzzles || []; 

        let query = { _id: { $nin: solvedList } };

        if (difficulty) {
            // Added 'i' for case-insensitivenesss
            query.difficulty = { $regex: new RegExp(difficulty, "i") };
        }

        console.log("Search Query:", JSON.stringify(query));
const puzzles = await Puzzle.find(query);
console.log("Puzzles Found:", puzzles.length);

        if (puzzles.length === 0) {
            return res.status(404).json({ msg: "You've solved everything in this category!" });
        }

        const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        res.json(randomPuzzle);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.post('/solve', auth, async (req, res) => {
    try {
        const { puzzleId } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user.solvedPuzzles) user.solvedPuzzles = [];

        if (!user.solvedPuzzles.includes(puzzleId)) {
            user.solvedPuzzles.push(puzzleId);
            await user.save();
        }
        res.json({ msg: "Progress saved!" });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;