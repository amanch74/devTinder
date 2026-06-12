const express = require('express');
const app = express();

// GET /user => It checks all the app.xxx("matching routes") functions
// GET /user => middlewares => request handler
// actually the request handler function is the one which hits the request and sends back response and all the functions between them are middlewares
app.use("/", (req,res, next) => {
    // res.send("Handling /route");
    next();
})

app.get("/user", (req, res, next) => {
    console.log("Handling the route user1")
    next();
});
// one more way to create the route handler for the same route. It exactly matches and executes in the same way as previous one.
app.get("/user", (req, res, next) => {
    console.log("Handling the route user2")
    res.send("Response2");
});



app.listen(3000, () => {
    console.log('Server is running on port 3000'); 
});