// Error handling using app.use("/", (err, req, res, next) should be written towards the end.
const express = require('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const { model } = require('mongoose');

const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth")

//middleware given by express to read to json format and and convert it into the javascript object
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {

    try {
        // validation of data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;
        // Encrypt the password

        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        // creating a new instance of the User model

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        })

        await user.save();
        res.send("user added successfully");
    }
    catch (err) {
        res.status(400).send("Error saving the data" + err.message);
    }
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error(" Invalid credentials")
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {

            const token = await user.getJWT();

            // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$1234" , {
            //     expiresIn : "2d",
            // });
            
            res.cookie("token", token, {
                expires : new Date(Date.now() + 8 * 3600000) // exxpire in 8 days 
            });

            res.cookie("token", token);
            res.send("Login Successful");
        }
        else {
            throw new Error(" Invalid credentials");
        }

    }
    catch (err) {
        res.status(400).send("ERORR : " + err.message);
    }
})

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

app.post("/sendConnectionRequest" , userAuth, (req,res) => {

    const user = req.user;

    console.log("Sending a request ");

    res.send(user.firstName + " has sent the request");
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
app.delete("/user", async (req, res) => {

    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully ")
    }
    catch (err) {
        res.status(400).send("Something get wrong")
    }
})

// update the database
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [
            "photoUrl",
            "about",
            "age",
            "gender",
            "skills",
        ]

        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)

        );
        if (!isUpdateAllowed) {
            throw new Error(" updates not allowed");

        }
        if (data?.skills.length > 10) {
            throw new Error("SKILLS cannot be more than 10");
        }
        await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true
        })
        res.send("updates successfully")
    }
    catch (err) {
        console.log(err);
        res.status(400).send("UPDATE FAILED" + err.message);
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

