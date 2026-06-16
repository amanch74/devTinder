const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://amanchy2002_db_user:UknYr80c5VY8k22r@namastenode.kukrqhq.mongodb.net/devTinder"
    );
}

module.exports = connectDB;