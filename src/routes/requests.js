const express = require('express');

const requestRouter = express.Router();

const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest" , userAuth, (req,res) => {

    const user = req.user;

    console.log("Sending a request ");

    res.send(user.firstName + " has sent the request");
})

module.exports = requestRouter;