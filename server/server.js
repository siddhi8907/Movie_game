const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');



require('dotenv').config();

const app= express();
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI, {dbName: 'movies'})
.then(()=> console.log("Database Connected successfully!"))
.catch(err => console.log(err.message));

const authroutes = require('./routes/auth');

app.use('/api/auth', authroutes);




app.use('/api/puzzles', require('./routes/puzzles'));
app.get('/api/health', (req,res)=> {
    res.send("Checking ..,,,")
});

const PORT = process.env.port || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

