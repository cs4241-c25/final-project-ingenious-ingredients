import * as React from 'react';
import RecipeCard from "./RecipeCard";
import Grid2 from "@mui/material/Grid2";

import {Recipe} from "../../../Classes/Recipe";

interface RecipeGridProps {
    colNum: number,
    recipes: Recipe[],
    maxRecipes?: number,
}

const RecipeGrid: React.FC<RecipeGridProps> = ({recipes, colNum, maxRecipes}) => {

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
                    />
                </Grid2>
            ))}
        </Grid2>
    );
}

export default RecipeGrid;