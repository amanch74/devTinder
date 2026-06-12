const express = require('express');
const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth")

app.use("/admin", adminAuth)

// app.get("/admin/getAllData", (req,res) => {
//     // check if the request is authorized
//     const token = "sbieufhhfwvuu"
//     const isAdminAuthorised = token === "xyz";

//     if(isAdminAuthorised){
//         res.send("All data sent");
//     }
//     else{
//         res.status(401).send("Unauthorized user");
//     }
//     // but if we do this we have to do it in every route which will cause code repetition- there comes middleware in the role.
    
// })

// what if we use another route => "it will not pass through middleware"
app.use("/user" , userAuth, (req,res) => {
    res.send("User is printed");
})

app.get("/admin/getAllData", (req,res) => {
    res.send("Data is sent")
})

app.get("/admin/deleteUser", (req,res) => {
    res.send("Deleted a User")
})

app.listen(3000, () => {
    console.log('Server is running on port 3000'); 
});