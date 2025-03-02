"use client";

import RecipeGrid from "@/components/Display Recipe/RecipeGrid";
import GetAllRecipes from "@/Get-Post Requests/Recipe/getAllRecipes"
import {Recipe} from "../../../Classes/Recipe";
import React, { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar";
import {useSession} from "next-auth/react";
import {CheckIfUserExists} from "@/Get-Post Requests/User/checkIfUserExists";
import {PostUser} from "@/Get-Post Requests/User/postUser";
import {User} from "../../../Classes/User";
import TrendingRecipeSection from "@/components/Hero/TrendingRecipeSection";
import ImageParallax from "@/components/Hero/ImageParallax";
import IngredientsTable from "@/components/IngredientsTable";

export default function MyPantryPage() {
    // const [recipes, setRecipes] = useState<Recipe[]>([]);
    //
    // const {data: session} = useSession();
    //
    // useEffect(() => {
    //     async function fetchRecipes() {
    //         const fetchedRecipes = await GetAllRecipes();
    //         setRecipes(fetchedRecipes);
    //     }
    //     fetchRecipes();
    //     async  function checkUser(){
    //         console.log("Here");
    //         if (session) {
    //             console.log("Here2");
    //             const result = await CheckIfUserExists(session?.user?.name);
    //             console.log(result);
    //             if (result === false) {
    //                 await PostUser(new User(session?.user?.name, null, true));
    //             }
    //         }
    //     }
    //     checkUser();
    // }, []);

    return (
        <div>
            <NavBar stickOrNah={'static'}/>


            <div className="bg-white p-8">
                <IngredientsTable/>
            </div>
        </div>
    );
}