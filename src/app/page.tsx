"use client";

import RecipeGrid from "@/components/Display Recipe/RecipeGrid";
import GetAllRecipes from "@/Get-Post Requests/Recipe/getAllRecipes"
import {Recipe} from "../../Classes/Recipe";
import React, { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar";
import {useSession} from "next-auth/react";
import {CheckIfUserExists} from "@/Get-Post Requests/User/checkIfUserExists";
import {PostUser} from "@/Get-Post Requests/User/postUser";
import {User} from "../../Classes/User";
import TrendingRecipeSection from "@/components/Hero/TrendingRecipeSection";
import ImageParallax from "@/components/Hero/ImageParallax";
import "./globals.css";
import Footer from "@/components/Footer";

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
        <div className={"bg-fixed bg-cover"} style={{backgroundImage: "url('/emoji-grid.svg')"}}>
            <div style={{backgroundColor: "#fff0"}}>
                <NavBar stickOrNah={'static'}/>
                <ImageParallax/>
                <div className="bg-white p-8">
                    <TrendingRecipeSection/>
                </div>
                <Footer/>
            </div>
        </div>
    );
}