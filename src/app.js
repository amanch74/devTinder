// Error handling using app.use("/", (err, req, res, next) should be written towards the end.
const express = require('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const { model } = require('mongoose');

//middleware given by express to read to json format and and convert it into the javascript object
app.use(express.json());

app.post("/signup", async (req, res) => {

    // console.log(req.body);
    // creating an instance of the user model
    const user = new User(req.body);

    try {
        await user.save();
        res.send("user added successfully");
    }
    catch (err) {
        res.status(400).send("Error saving the data" + err.message);
    }
})

// get user by email

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;



    try {
        const user = await User.findOne({ emailId: userEmail }); // it will return the one document
        res.send(user);
        // const user = await User.find({ emailId: userEmail });
        // if(user.length === 0){
        //     res.status(404).send("user not found");
        // }
        // else{
        //     res.send(user);
        // }
    }
    catch (err) {
        res.status(400).send("Something went wrong");
    }
})

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({});// by initializing empty it give all the users from the document.
        res.send(users);
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// Delete a user from the database
app.delete("/user", async (req,res) => {

    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully ")
    }
    catch(err){
        res.status(400).send("Something get wrong")
    }
})

// update the database
app.patch("/user", async (req,res) => {
    const userId = req.body.userId;
    const data = req.body;
    
    try{
        await User.findByIdAndUpdate({ _id : userId} , data)
        res.send("updates successfully")
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

connectDB().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log("Database cant be connected")
})

