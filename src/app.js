// Error handling using app.use("/", (err, req, res, next) should be written towards the end.
const express = require('express');
const app = express();


//if it is written on top then by checking it, it doesn't have any error so it will send any error
// app.use("/", (err, req, res, next) => { // it matches all the routes
//     // log your error
//     // another way of handling error
//     if (err) {
//         res.status(500).send("Something went wrong");
//     }

// })

app.get("/getUserData", (req, res, next) => {

    try {
        // Logic of DB call and get user data
        throw new Error("sdnjnvj");
        res.send("User data is send");
    }
    catch (err) {
        res.status(500).send("Something big went wrong");
    }
    // Logic of DB call and get user data
    throw new Error("sdnjnvj");
    res.send("User data is send");
})

// app.use("/", (err, req, res, next) => { // it matches all the routes
//     // log your error
//     // another way of handling error
//     if (err) {
//         res.status(500).send("Something went wrong");
//     }

// })

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});