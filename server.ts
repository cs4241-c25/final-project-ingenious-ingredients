import {MongoClient} from "mongodb";

const express = require('express');
import {Request, Response} from 'express';
const mongodb = require('mongodb');



// Initialize the express application
const app = express();
const port = 3000;
const url = "mongodb+srv://tabranchaud:tb@cluster0.h4cuw.mongodb.net/";

const dbconnection = new MongoClient(url);
let userCollection = null;


// Basic route handler
app.get('/home', (req : Request , res : Response ) => {
    res.send("Send");
})

async function run() {
    await dbconnection.connect().then(() => console.log("Database Connected"));
    userCollection = await dbconnection.db("Ingredients").collection("Users");
    //const results = await userCollection.insertOne({"username": "Admin", "password": "Admin", "public": true, "favoritedRecipes": null});
    //console.log(results);
}

const appRun = run();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});