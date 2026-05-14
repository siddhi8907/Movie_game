const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/leaderboard', async (req, res) => {
    try {
        const leaders = await User.find({})
            .select('username solved_puzzles') 
            .sort({ 'solved_puzzles': -1 })   
            .limit(10);

        // Sort by number of solved puzzles (array length), descending
        const sorted = leaders
            .sort((a, b) => b.solved_puzzles.length - a.solved_puzzles.length)
            .map(user => ({
                _id: user._id,
                username: user.username,
                solvedCount: user.solved_puzzles.length  // send a clean number, not raw array
            }));

        res.json(sorted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;