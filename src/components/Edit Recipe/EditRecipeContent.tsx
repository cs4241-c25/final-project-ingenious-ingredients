import {Recipe} from "../../../Classes/Recipe";
import {TextField} from "@mui/material";
import DeleteRecipeButton from "@/components/DeleteRecipeButton";
import Button from "@mui/material/Button";
import React from "react";
import {DeleteRecipe} from "@/Get-Post Requests/Recipe/deleteRecipe";

interface EditRecipeContentProps {
    recipe: Recipe;
}

export default function EditRecipeContent({ recipe }: EditRecipeContentProps) {

    // if recipe is unchanged - no props are different, then if you click away from the modal it will let you without having a confirmation.

    const handleDeleteButton = () => {
        if (confirm("Are you sure you want to delete this recipe?")) {
            DeleteRecipe(recipe.slug).then(() => {
                window.location.href = '/recipes';
            });
        }
    };

    return (
        <>
            <TextField/>
            <div>
                <Button onClick={handleDeleteButton}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete Recipe
                </Button>
            </div>
        </>
    );
}