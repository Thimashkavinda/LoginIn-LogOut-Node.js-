const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

connect.then(() => {
    console.log("Database Conected SuccesFull!");
})

.catch(() => {
    console.log("Database Cannot Be Connected");
});


//Create Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//collection part
const collection = new mongoose.model("users",LoginSchema);

module.exports = collection;