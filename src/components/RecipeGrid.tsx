import * as React from 'react';
import RecipeCard from "./RecipeCard";
import Grid2 from "@mui/material/Grid2";

import {Recipe} from "../../Classes/Recipe";
import {Step} from "../../Classes/Step";
import {RecipeIngredient} from "../../Classes/RecipeIngredient";

interface RecipeGridProps {
    colNum: number,
    recipes: Recipe[],
    maxRecipes?: number,
}

const RecipeGrid: React.FC<RecipeGridProps> = ({recipes, colNum, maxRecipes}) => {

    // let ingredient1 = new RecipeIngredient("beef", 1, "lb");
    // let ingredient2 = new RecipeIngredient("cheese", 1, "slice");
    // let ingredient3 = new RecipeIngredient("lettuce", 1, "leaf");
    // let step1 = new Step("Cook the beef", [ingredient1]);
    // let step2 = new Step("Put the cheese on the beef", [ingredient1, ingredient2]);
    // let step3 = new Step("Put the lettuce on the cheese", [ingredient3]);
    //
    // let Cheeseburger = new Recipe([step1, step2, step3], "Cheeseburger", "Andrew", true, 30, "lunch", 23, "February 1, 2025", [ingredient1, ingredient2, ingredient3], ["delicious", "yummy", "cool"]);
    // let Pizza = new Recipe([step1, step2, step3], "Pizza", "John", true, 20, "dinner", 50, "March 1, 2025", [ingredient1, ingredient2, ingredient3], ["tasty", "cheesy"]);
    // let Salad = new Recipe([step1, step2, step3], "Salad", "Jane", true, 10, "lunch", 15, "April 1, 2025", [ingredient1, ingredient2, ingredient3], ["healthy", "fresh"]);
    // const recipes = [Cheeseburger, Pizza, Salad];

    function getTopRecipes(recipes: Recipe[]) {
        if (!maxRecipes) {
            return recipes.sort((a, b) => b.likes - a.likes);
        }
        return recipes.sort((a, b) => b.likes - a.likes).slice(0, maxRecipes);
    }
    const topRecipes = getTopRecipes(recipes);

    return (
        <Grid2 container spacing={3} columns={colNum} sx={{ width: '100%', margin: "auto", padding: 2, justifyContent: "center"}}>
            {topRecipes.map((recipe, index) => (
                <Grid2 sx={{xs: 6, sm: 4, md: 3, justifyContent: "center"}} key={index} component="div">
                    <RecipeCard
                        recipe={recipe}
                        image={"https://upload.wikimedia.org/wikipedia/commons/4/4d/Cheeseburger.jpg"}
                    />
                </Grid2>
            ))}
        </Grid2>
    );
}

export default RecipeGrid;