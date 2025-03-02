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

export default function Hero() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const {data: session} = useSession();

    useEffect(() => {
        async function fetchRecipes() {
            const fetchedRecipes = await GetAllRecipes();
            setRecipes(fetchedRecipes);
        }
        fetchRecipes();
        async  function checkUser(){
            console.log("Here");
            if (session) {
                console.log("Here2");
                const result = await CheckIfUserExists(session?.user?.name);
                console.log(result);
                if (result === false) {
                    await PostUser(new User(session?.user?.name, null, true));
                }
            }
        }
        checkUser();
    }, []);
    
    return (
        <div>
            <NavBar stickOrNah={'static'}/>
            {/*<div className="flex items-center justify-center h-96 bg-fixed bg-parallax bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488992783499-418eb1f62d08?q=80&w=3389&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>*/}
            {/*    <div className="text-center">*/}
            {/*        <h1 className="text-8xl font-bold mb-4 border-4 text-white">TAKE CONTROL OF YOUR KITCHEN</h1>*/}
            {/*        <p className="text-4xl font-bold text-white">Let Them Cook!</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <ImageParallax/>

            <div className="bg-white p-8">
                <TrendingRecipeSection/>
            </div>
        </div>
    );
}