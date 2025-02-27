"use client";

import React, {useEffect, useState} from 'react';
import RecipeGrid from "@/components/RecipeGrid";
import GetAllRecipes from "@/Get-Post Requests/Recipe/getAllRecipes";
import {Recipe} from "../../../Classes/Recipe";
import NavBar from "@/components/NavBar";

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        async function fetchRecipes() {
            const allRecipes = await GetAllRecipes();
            setRecipes(allRecipes);
        }
        fetchRecipes();
    }, []);

    return (
        <div>
            <NavBar stickOrNah={"sticky"}/>
            <RecipeGrid colNum={3} recipes={recipes} />
        </div>
    );
}