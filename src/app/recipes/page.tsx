"use client";

import React, {useEffect, useState} from 'react';
import RecipeGrid from "@/components/RecipeGrid";
import GetAllRecipes from "@/Get-Post Requests/Recipe/getAllRecipes";
import {Recipe} from "../../../Classes/Recipe";
import BrowseFilterTags from "@/components/BrowseFilterTags";
import NavBar from "@/components/NavBar";
import {GetRecipesByTags} from "@/Get-Post Requests/Recipe/getRecipesByTags";

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        async function fetchRecipes() {
            if(selectedTags.length === 0) {
                const allRecipes = await GetAllRecipes();
                console.log(allRecipes);
                setRecipes(allRecipes);
            } else {
                const filteredRecipes = await GetRecipesByTags(selectedTags);
                setRecipes(filteredRecipes);
            }
        }
        fetchRecipes();
    }, [selectedTags]);

    return (
        <>
            <NavBar stickOrNah={"sticky"}></NavBar>

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
        </>
    );
}