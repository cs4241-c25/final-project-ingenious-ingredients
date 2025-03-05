import * as React from 'react';
import RecipeCard from "./RecipeCard";
import Grid2 from "@mui/material/Grid2";
import {Recipe} from "../../../Classes/Recipe";

interface RecipeGridProps {
    colNum: number,
    recipes: Recipe[],
    sortingType: string,
    maxRecipes?: number,
}

const RecipeGrid: React.FC<RecipeGridProps> = ({recipes, colNum, sortingType, maxRecipes}) => {
    const [sortedRecipes, setSortedRecipes] = React.useState<Recipe[]>([]);

    React.useEffect(() => {
        console.log("useEffect triggered in RecipeGrid");
        function sortRecipes(recipes: Recipe[]) {
            let sorted = [...recipes];
            if (sortingType === "date") {
                sorted = sorted.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
            } else if (sortingType === "name") {
                sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortingType === "likes") {
                sorted = sorted.sort((a, b) => b.likes - a.likes);
            }
            if (maxRecipes) {
                sorted = sorted.slice(0, maxRecipes);
            }
            return sorted;
        }

        console.log("Sorting type:", sortingType);
        console.log("Recipes before sorting:", recipes);
        const sorted = sortRecipes(recipes);
        console.log("Recipes after sorting:", sorted);
        setSortedRecipes(sorted);
    }, [recipes, sortingType, maxRecipes]);

    return (
        <Grid2 container spacing={3} columns={colNum} sx={{ width: '100%', margin: "auto", padding: 2, justifyContent: "center"}}>
            {sortedRecipes.map((recipe, index) => (
                <Grid2 sx={{xs: 6, sm: 4, md: 3, justifyContent: "center"}} key={index} component="div">
                    <RecipeCard recipe={recipe} />
                </Grid2>
            ))}
        </Grid2>
    );
}

export default RecipeGrid;