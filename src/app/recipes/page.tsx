"use client";

import React, {useEffect, useState} from 'react';
import RecipeGrid from "@/components/Display Recipe/RecipeGrid";
import GetAllRecipes from "@/Get-Post Requests/Recipe/getAllRecipes";
import {Recipe} from "../../../Classes/Recipe";
import BrowseFilterTags from "@/components/Display Recipe/BrowseFilterTags";
import BrowseSort from "@/components/Display Recipe/BrowseSort";
import NavBar from "@/components/NavBar";
import {GetRecipesByTags} from "@/Get-Post Requests/Recipe/getRecipesByTags";
import {Box} from "@material-ui/core";

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>("likes");

    useEffect(() => {
        async function fetchRecipes() {
            let fetchedRecipes;
            if (selectedTags.length === 0) {
                fetchedRecipes = await GetAllRecipes();
            } else {
                fetchedRecipes = await GetRecipesByTags(selectedTags);
            }

            // Sort the recipes based on the selected sorting criteria
            fetchedRecipes.sort((a, b) => {
                if (sortBy === "date") {
                    return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
                } else if (sortBy === "likes") {
                    return b.likes - a.likes;
                } else if (sortBy === "name") {
                    return a.name.localeCompare(b.name);
                }
                return 0;
            });

            setRecipes(fetchedRecipes);
        }
        fetchRecipes();
    }, [selectedTags, sortBy]);

    const handleSortChange = (sortBy: string) => {
        setSortBy(sortBy);
    };

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
                    <br/>
                    <BrowseSort onSortChange={handleSortChange}/>
                </Box>

                <Box id="main-browse-content" sx={{display: "flex", flexDirection: "column",
                    bgcolor: "#F2D6C7", padding: "2rem", borderTop: "8px solid #F06449",
                    borderLeft: "3px solid #F06449", borderRight: "3px solid #F06449", borderBottom: "8px solid #F06449",
                    borderRadius: "0.3rem"}}>
                    <RecipeGrid colNum={3} recipes={recipes} sortingType={sortBy}/>
                </Box>
            </div>
        </div>
    );
}