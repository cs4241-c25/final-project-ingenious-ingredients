import {PostUser} from "../Get-Post Requests/User/postUser";
import {GetUser} from "../Get-Post Requests/User/getUser";
import {ModifyPublic} from "../Get-Post Requests/User/modifyPublic";
import {RecipeIngredient} from "../../Classes/RecipeIngredient";
import {RecipeStep} from "../../Classes/Step";
import {Recipe} from "../../Classes/Recipe";
import {PostRecipe} from "../Get-Post Requests/Recipe/postRecipe";
import {GetRecipe} from "../Get-Post Requests/Recipe/getRecipe";
import {User} from "../../Classes/User";
import {tags} from "@emotion/styled/src/tags";
import GetTags from "../Get-Post Requests/Tags/getTags";
import {GetRecipesByTags} from "../Get-Post Requests/Recipe/getRecipesByTags";
import {GetRecipeFromSlug} from "@/Get-Post Requests/Recipe/getRecipeFromSlug";
import {LikeRecipe} from "@/Get-Post Requests/Recipe/likeRecipe";
import {CheckForSlug} from "@/Get-Post Requests/Recipe/checkForSlug";
import {CheckIfUserExists} from "@/Get-Post Requests/User/checkIfUserExists";
import {GetRecipesByUser} from "@/Get-Post Requests/Recipe/getRecipesByUser";
import {ModifyRecipe} from "@/Get-Post Requests/Recipe/modifyRecipe";
import {ModifyAboutMe} from "@/Get-Post Requests/User/modifyAboutMe";
import {PantryIngredient} from "../../Classes/PantryIngredient";
import {PostIngredient} from "@/Get-Post Requests/PantryIngredient/postIngredient";
import {GetIngredientsByUser} from "@/Get-Post Requests/PantryIngredient/getIngredientsByUser";
import {DeleteIngredient} from "@/Get-Post Requests/PantryIngredient/deleteIngredient";


export async function PostTest() {

/*
        //Example function calls to current endpoints

        //Creating and Posting a User
    const newUser = new User("Jeff", "JeffPassword", true, undefined, "I am very cool");
    console.log(await PostUser(newUser));
        //If the user was added correctly, the PostUser function will return true, if not it will return false
        //Getting a User
    console.log(await GetUser("Jeff"));
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
    const step1 = new RecipeStep("Add an Egg and Cheese", [egg1, cheese]);
    const step2 = new RecipeStep("Add more Egg", [egg2]);
        //They take in a string as the Instructions someone would follow, and an array of the ingredients needed

        //Finally is putting them together into a Recipe object
    const Recipe1 = new Recipe([step1, step2], "Eggs", "You", true, 5, "Breakfast", undefined, undefined, undefined, ["Easy"], undefined, undefined);
        //And then posting the Recipe
    console.log(await PostRecipe(Recipe1));
        //Posting a Recipe will return true if the recipe was created and false if there was an error
        //Getting a Recipe -> Requires the Recipe name and the creator
    console.log(await GetRecipe("Eggs", "Me"));
        //Returns the recipe as a Recipe Object

        //Getting a Recipe from slug -> Takes in a string that has the recipe name attached to the creator
    console.log(await GetRecipeFromSlug("eggs-me"));
        //Returns the recipe as a recipe object


        //Getting all tags in the database, returns a list of strings
    await GetTags();

        //Gets all recipes that have a all tags in a list, can also optionally take in a Username to return all
        //Recipes that they have listed with those tags
        //If no user is given then it will search all public recipes
    await GetRecipesByTags(["Easy"]);


        //Adds a like to the recipe found by the given Slug and adds the slug to the user's favoritedRecipes list
    await LikeRecipe("Henry", "eggs-me");
        //Returns true if the function was successful, returns false if there was an error with either step

        //Checks if a Recipe with the given slug exists in the database
    console.log(await CheckForSlug("eggs-me"));
        //Returns true if there is no recipe with the slug, false if there is

        //Checks if a Username already exists in the database
    console.log(await CheckIfUserExists("Henry"));
        //Returns true if a user already exists, false if not

        //Gets all recipes given a username
    console.log(await GetRecipesByUser("Me"));
        //Returns a list of recipes, or an empty list if no recipes are found

        //Modifies a recipe, Takes in a new recipe object to change the old recipe into using the recipe's slug
    console.log(await ModifyRecipe(Recipe1, "eggs-me"));
        //Returns true if the operation was successful, false if not

        //Modify a users about me, takes in the username and the new about me to set
    console.log(await ModifyAboutMe("ThomasBranchaud", "I AM a good cook!"));
        //Returns true if a connection was made to the database, not if the user was found

    const newIng = new PantryIngredient("Eggs", 3, "Eggs", "ThomasBranchaud");
    const ing2 = new PantryIngredient("Cheese", 10, "Slices", "ThomasBranchaud");
    const ing3 = new PantryIngredient("Eggs", 1, "Eggs", "ThomasBranchaud");

        //Adding new Pantry Ingredients, takes in a Pantry Ingredient
    console.log(await PostIngredient(newIng));
    console.log(await PostIngredient(ing2));
    console.log(await PostIngredient(ing3));
        //Returns either "Added New Ingredient" if a new entry was made or "Combined with Pre-existing Ingredient" if it was combined with another entry

        //Get Ingredients that are associated with a given username
    console.log(await GetIngredientsByUser("ThomasBranchaud"));
        //Returns a list of PantryIngredients

        //Delete a PantryIngredient, takes in the name of the Ingredient to delete and the Username of the user who has the ingredient
    console.log(await DeleteIngredient("Eggs", "ThomasBranchaud"));
        //Returns true if the call checked the database for the given Ingredient
 */
}