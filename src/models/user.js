const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true,
        minLength : 4,
    },
    lastName: {
        type : String,
    },
    emailId: {
        type : String,
        lowercase: true,
        required : true,
        unique : true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email Address " + value);
            }
        }
    },
    password: {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error(" Not a strong password : " + value);
            }
        }
    },
    age: {
        type : Number,
        min : 18,
    },
    gender: {
        type : String,
        validate(value){
            // validate funtion will not run on update automatically it will run by default when new user signs in...we have to enable it manually on update in option in the third argument of findByIdAndUpdate
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type : String,
        default : "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",

        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL : " + value);
            }
        }

    },
    about : {
        type : String,
        default : "This is a default about of the user!"
    },
    skills : {
        type : [String],
    }
},
{
    timestamps : true
}
)

const userModel = mongoose.model("User" , userSchema);

module.exports = userModel;