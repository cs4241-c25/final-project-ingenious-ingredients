import {MongoClient} from "mongodb";

import express from "express";
import {Request, Response} from 'express';
import cors from "cors";
import {Collection} from 'mongodb';



// Initialize the express application
const app = express();
app.use(cors())
app.use(express.json())
const port = 3000;
const url = "mongodb+srv://tabranchaud:tb@cluster0.h4cuw.mongodb.net/";

const dbconnection = new MongoClient(url);
let userCollection : Collection | null = null;


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

app.post('/postUser', async (req: Request, res: Response) => {
    console.log("Post User received");
    const insert = {
        username: req.body.username,
        password: req.body.password,
        isPublic: req.body.isPublic,
        favoritedRecipes: null
    }
    try{
        let results;
        if (userCollection) {
            const results = await userCollection.insertOne(insert);
        }
        console.log(results)
        res.status(201).send("User added to collection");
    }
    catch (error){
        console.error(error);
        res.status(500).send("Error when adding user to collection");
    }
})

const appRun = run();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})