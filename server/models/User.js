const { required } = require('joi');
const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema(
    {
        username:{
            type:String, required:true, unique:true
        },
        password:{
            type: String, required:true
        },
        solved_puzzles:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Puzzle'
        }]

        /*solved_puzzles will store list of ids of all
         puzzles that the player solves*/
    }
);

module.exports=mongoose.model('User', UserSchema);
//this helps enable functions like find, delete on particular user 
//and export this format