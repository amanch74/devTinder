const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email Address " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error(" Not a strong password : " + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            // validate funtion will not run on update automatically it will run by default when new user signs in...we have to enable it manually on update in option in the third argument of findByIdAndUpdate
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",

        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL : " + value);
            }
        }

    },
    about: {
        type: String,
        default: "This is a default about of the user!"
    },
    skills: {
        type: [String],
    }
},
    {
        timestamps: true
    }
)

userSchema.methods.getJWT = async function () { // dont use arrow function as this keyword doesnt work with it.
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$1234", {
        expiresIn: "7d",
    })

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const hashPassword = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser , hashPassword);

    return isPasswordValid;
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;