"use client";

import React from 'react';
import {Recipe} from "../../Classes/Recipe";
import Button from "@mui/material/Button";
import {DeleteRecipe} from "@/Get-Post Requests/Recipe/deleteRecipe";

interface DeleteRecipeButtonProps {
    recipe: Recipe;
}

export default function DeleteRecipeButton({ recipe }: DeleteRecipeButtonProps) {

    const handlePress = () => {
        if (confirm("Are you sure you want to delete this recipe?")) {
            DeleteRecipe(recipe.slug);
        }
    };

    return (
        <div>
            <Button onClick={handlePress} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete Recipe
            </Button>
        </div>
    );
}