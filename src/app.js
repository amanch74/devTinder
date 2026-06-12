const express = require('express');
const app = express();

app.use("/route", rH1, rH2, [rH3, rH4, rH5], rH6); // placing array individual or in an array will work same(place anyhow work in the order of the handlers). it wiil work on all http route handlers get, post, put, delete etc. it will work on all the routes that start with /route

app.use("/user", (req, res, next) => {
    // route handler
    console.log("Handling the route user1")
    // next();
    // res.send("Response1");
    next(); // Call next() to pass control to the next route handler

}, (req,res,next) => {
    //second route handler
    console.log("Handling the route user2");
    // res.send("Response2"); // it will not come to this response until next() is called in the first route handler
    next();

}, (req,res,next) => {
    
    console.log("Handling the route user3");
    // res.send("Response3");
    next();
     
    
}, (req,res,next) => {
    
    console.log("Handling the route user4");
    // res.send("Response4"); 
    next(); // if the last handler has next( but no respnse) then it will move to the next route handller if there is nothing in the next i will throw an error cannot/Get. but if there is something next after and there is no response then it will show only loading...
    
});


app.listen(3000, () => {
    console.log('Server is running on port 3000'); 
});