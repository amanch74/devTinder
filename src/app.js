// Error handling using app.use("/", (err, req, res, next) should be written towards the end.
const express = require('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

app.post("/signup", async (req,res) => {
    const user = new User({
        firstName : "vinita",
        lastName : "singh",
        emailId : "vinita@singh.com",
        password : "vinita@123"
    });

    try{
        await user.save();
    res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the data" + err.message);
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

