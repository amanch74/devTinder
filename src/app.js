const express = require('express');
const app = express();

// This is the root route handler, anything that matches after "/" will trigger this handler. if order of routes is chaged then it will follow the order. so the order is important in express. if we put this route at the end then it will work as a catch all route and will trigger for any route that is not defined above it.
// app.use("/", (req,res) => {
//     res.send('Hello World!');
// })

app.use("/test", (req, res) => { // app.use() will match all the HTTP meethods
    res.send('Hello from Express!');
});

// app.use("/hello", (req, res) => {
//     res.send('Hello hello hello!');
// });

app.get("/user" , (req,res) => {
    res.send("firstName: Aman, LastName: Choudhary");
})

app.post("/user", (req,res) => {
    res.send("User created successfully!");
})

app.delete("/user", (req, res) => {
    res.send("User deleted successfully!");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});