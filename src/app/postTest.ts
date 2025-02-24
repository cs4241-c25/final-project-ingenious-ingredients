import {PostUser} from "../Get-Post Requests/User/postUser";
import {GetUser} from "../Get-Post Requests/User/getUser";
import {ModifyPublic} from "../Get-Post Requests/User/modifyPublic";
import {RecipeIngredient} from "../../Classes/RecipeIngredient";
import {Step} from "../../Classes/Step";
import {Recipe} from "../../Classes/Recipe";
import {PostRecipe} from "../Get-Post Requests/Recipe/postRecipe";
import {GetRecipe} from "../Get-Post Requests/Recipe/getRecipe";
import {User} from "../../Classes/User";


export async function PostTest() {

    /*
        //Example function calls to current endpoints

        //Creating and Posting a User
    const newUser = new User("Henry", "henryPassword", true);
    console.log(await PostUser(newUser));
        //If the user was added correctly, the PostUser function will return true, if not it will return false

        //Getting a User
    console.log(await GetUser("Henry"));
        //Searches for a user by username and returns them as a User object

        //Modifying a Users Public status
    console.log(await ModifyPublic("Henry", false));
        //Searches for a user and changes the isPublic status

        //Creating a Recipe -> Requires creating Ingredients, and then Steps
        //First, creating Ingredients
    const egg1 = new RecipeIngredient("Egg", 2, "eggs");
    const cheese = new RecipeIngredient("Cheese", 1, "scoop");
    const egg2 = new RecipeIngredient("Egg", 1, "eggs");
        //Ingredients for a recipe use the RecipeIngredient class

        //Next is creating Steps using the ingredients
    const step1 = new Step("Add an Egg and Cheese", [egg1, cheese]);
    const step2 = new Step("Add more Egg", [egg2]);
        //They take in a string as the Instructions someone would follow, and an array of the ingredients needed

        //Finally is putting them together into a Recipe object
    const Recipe1 = new Recipe([step1, step2], "Eggs", "Me", true, 5, "Breakfast");
        //And then posting the Recipe
    console.log(await PostRecipe(Recipe1));
        //Posting a Recipe will return true if the recipe was created and false if there was an error

        //Getting a Recipe -> Requires the Recipe name and the creator
    console.log(await GetRecipe("Eggs", "Me"));
        //Returns the recipe as a Recipe Object

     */
}