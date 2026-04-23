const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs'); //for pswd

const jwt = require('jsonwebtoken');
//this is for the login part, so that the user doesn't gets logged out on every step

router.post('/signup', async(req,res)=>{
    try{
        const{username, password}= req.body;

        let user = await User.findOne({username});
        if(user) return res.status(400).json({msg: "Username is not available"});
          
        //this part helps to keep all the usernames unique
        //we use .json instead of .send so we can connect with frontend easily


        //Now to convert the password into a hidden code
        //salting first adds random chars in between
        const salt = bcrypt.genSalt(10);
        const hashed_pswd= bcrypt.hash(password, salt);

        //Saving to database
        user = new User({
            username, password: hashed_pswd
        });

        await user.save()
        res.status(201).json({msg:"User created successfully"});


    } catch(err){
        res.status(500).json({msg:"Server Error"});
    }
});


router.post('/login', async(req,res)=>
{
    try{
        const {username, password}= req.body;
        let check = await User.findOne({username});
        if(!check) return res.status(400).json({msg: "No user found"});

        let verify= await bcrypt.compare(password, hashed_pswd);
        if(!verify) return res.status(400).json({msg: "Wrong Password"});
    
        //check if such user exists with same username

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        //now we make a code so that the server can identify, it's the same user and it is signed so that it can't be copied

        res.json({ token, username: user.username });
    } catch(err){
        res.status(500).json({msg: "Server Error"});
    }
});


module.exports= router;