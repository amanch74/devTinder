const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {

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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout" , async (req, res) => {
    res.cookie("token" , null, {
        expires : new Date(Date.now()),
    });
    res.send("Logout successful");
})

module.exports = authRouter;
