const express = require('express');
const pasth = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");



const app = express();
//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

//use EJS as the viw engine
app.set('view engine','ejs');
//static file
app.use(express.static("public"));

app.get("/",(req,res) => {
    res.render("Login");
});

app.get("/signup", (req,res) => {
    res.render("SignUp");
})

//Register User
app.post("/signup", async (req,res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }


    //check if the user alredy exists in the database
    const existingUser = await collection.findOne({name: data.name});

    if(existingUser){
        res.send("User allredy exists.plaease choose a diffrent database.");
    }else{
    const userdata = await collection.insertMany(data);
    console.log(userdata);
    res.render("Login");}});

    //Login user
    app.post("/login", async(req,res) => {
        try{
            const check = await collection.findOne({name: req.body.username});
            if(!check){
                res.send("user name cannot found!");
            }

            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if(isPasswordMatch){
                res.render("home");
            }else{
                req.send("Wrong password");
            }
        }catch{
            res.send("Welcome to Home Page");
        }
    });
const port = 5000;
app.listen(port, () => {
    console.log("Server runing on port: $(port)");
});