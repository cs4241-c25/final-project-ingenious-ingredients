"use client";

import React, {useEffect, useState} from 'react';
import RecipeGrid from "@/components/RecipeGrid";
import GetAllRecipes from "@/Get-Post Requests/Recipe/getAllRecipes";
import {Recipe} from "../../../Classes/Recipe";
import NavBar from "@/components/NavBar";
import BrowseFilterTags from "@/components/BrowseFilterTags";
import {GetRecipesByTags} from "@/Get-Post Requests/Recipe/getRecipesByTags";

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
        <>
            <NavBar stickOrNah={"sticky"}/>

            <div id="page-background"
                 style={{
                     margin: "auto",
                     justifyContent: "flex-start",
                     gap: "3rem",
                     display: "flex"}}>

                <aside id="sidebar">
                    <BrowseFilterTags onTagsChange={setSelectedTags}/>
                </aside>

                <section id="main-browse-content">
                    <RecipeGrid colNum={3} recipes={recipes} />
                </section>
            </div>
       
            <RecipeGrid colNum={3} recipes={recipes} />
         </>
    );
}