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
let recipeCollection : Collection | null = null;


// Basic route handler
app.get('/home', (req : Request , res : Response ) => {
    res.send("Send");
})

async function run() {
    await dbconnection.connect().then(() => console.log("Database Connected"));
    userCollection = await dbconnection.db("Ingredients").collection("Users");
    recipeCollection = await dbconnection.db("Ingredients").collection("Recipes");
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
    try {
        let results;
        if (userCollection){
            results = await userCollection.findOne({username: insert.username})
        }
        if (results !== null){
            console.log("User already exists in collection");
            res.status(202).send("Username already exists in collection");
            return;
        }
    }
    catch (error){
        console.error(error);
        res.status(501).send("Error when adding user to collection");
    }
    try{
        let results;
        if (userCollection) {
            results = await userCollection.insertOne(insert);
        }
        console.log(results)
        res.status(201).send("User added to collection");
    }
    catch (error){
        console.error(error);
        res.status(500).send("Error when adding user to collection");
    }
})

app.post('/getUser', async (req: Request, res: Response) => {
    console.log("Get User Received")
    try {
        let user;
        if (userCollection){
            user = await userCollection.findOne({username: req.body.username});
        }
        console.log(user);
        res.send(user);
    }
    catch (error){
        console.error(error)
        res.status(500).send("Error when adding user to collection");
    }
})

app.post('/modifyPublicStatus', async (req: Request, res: Response) => {
    console.log("Modify User's Public Status Received");
    try {
        if (userCollection) {
            await userCollection.findOneAndUpdate({username: req.body.username}, {
                $set: {
                    isPublic: req.body.isPublic
                }
            })
        }
        res.status(201).send("User public status has been updated to " + req.body.isPublic);
    }
    catch (error){
        console.error(error);
        res.status(203).send("Error changing public status on user");
    }
})

app.post('/postRecipe', async (req: Request, res: Response) => {
    console.log("Post Recipe Received");
    console.log(req.body);
    const currentDate = new Date();
    const insert = {
        steps: req.body.steps,
        name: req.body.name,
        creator: req.body.creator,
        isPublic: req.body.isPublic,
        likes: 0,
        ingredients: req.body.ingredients,
        prepTime: req.body.prepTime,
        mealType: req.body.mealType,
        postDate: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
    }
    try {
        let results;
        if (recipeCollection) {
            results = await recipeCollection.insertOne(insert);
        }
        console.log(results);
        res.status(201).send("Recipe Added to Collection");
    }
    catch (error){
        console.error(error);
        res.status(205).send("Recipe could not be added to Collection");
    }
})

const appRun = run();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
