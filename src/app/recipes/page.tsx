"use client";

import React, {useEffect, useState} from 'react';
import RecipeGrid from "@/components/Display Recipe/RecipeGrid";
import GetAllRecipes from "@/Get-Post Requests/Recipe/getAllRecipes";
import {Recipe} from "../../../Classes/Recipe";
import BrowseFilterTags from "@/components/Display Recipe/BrowseFilterTags";
import NavBar from "@/components/NavBar";
import {GetRecipesByTags} from "@/Get-Post Requests/Recipe/getRecipesByTags";
import {Box} from "@material-ui/core";

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
        <div style={{backgroundImage: "url('/emoji-grid-2.svg')"}}>
            <NavBar stickOrNah={"sticky"}></NavBar>

            <div id="page-background"
                 style={{
                     margin: "auto",
                     justifyContent: "flex-start",
                     gap: "3rem",
                     display: "flex",
                     backgroundColor: "#fff0",}}>

                <Box id="sidebar" sx={{display: "flex", flexDirection: "column",
                    bgcolor: "#F2D6C7", padding: "2rem", borderTop: "8px solid #F06449",
                    borderLeft: "3px solid #F06449", borderRight: "3px solid #F06449", borderBottom: "8px solid #F06449",
                    borderRadius: "0.3rem"}}>
                    <BrowseFilterTags onTagsChange={setSelectedTags}/>
                </Box>

                <Box id="main-browse-content" sx={{display: "flex", flexDirection: "column",
                    bgcolor: "#F2D6C7", padding: "2rem", borderTop: "8px solid #F06449",
                    borderLeft: "3px solid #F06449", borderRight: "3px solid #F06449", borderBottom: "8px solid #F06449",
                    borderRadius: "0.3rem"}}>
                    <RecipeGrid colNum={3} recipes={recipes} />
                </Box>
            </div>
        </div>
    );
}