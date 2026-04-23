const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app= express();
app.use(cors());
app.use(express.json());

const URI= 'mongodb+srv://Siddhi:Siddhi@8mongoDB@cluster0.wmiuppx.mongodb.net/?movies=Cluster0'

mongoose.connect(URI, {dbName: 'movies'})
.then(()=> console.log("Database Connected successfully!"))
.catch(err => console.log(err));

const authroutes = require('./routes/auth');

app.use('/api/auth', authroutes);

app.get('/api/health', (req,res)=> {
    res.send("Checking ..,,,")
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

