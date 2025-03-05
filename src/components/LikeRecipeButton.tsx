import { LikeRecipe } from "@/Get-Post Requests/Recipe/likeRecipe";
import { UnlikeRecipe } from "@/Get-Post Requests/Recipe/unlikeRecipe";
import Button from "@mui/material/Button";
import RecommendIcon from '@mui/icons-material/Recommend';
import { Session } from "next-auth";
import { Recipe } from "../../Classes/Recipe";
import React, { useState, useEffect } from "react";
import {GetUser} from "@/Get-Post Requests/User/getUser";

interface LikeRecipeButtonProps {
    recipe: Recipe;
    session: Session;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function LikeRecipeButton({ recipe, session, onClick }: LikeRecipeButtonProps) {
    const [likes, setLikes] = useState(recipe.likes);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Check if the user has already liked the recipe
        if (session && session.user) {
            // Assume we have a function to get the user data
            const fetchUser = async () => {
                const user = await GetUser(session.user.name);
                const userHasLiked = user.favoritedRecipes.includes(recipe.slug);
                setLiked(userHasLiked);
            };
            fetchUser();
        }
    }, [session, recipe.slug]);

    async function handleLikeRecipe() {
        if (!session || !session.user) {
            return alert("You must be logged in to like a recipe");
        }

        if (liked) {
            await UnlikeRecipe(session.user.name, recipe.slug);
            setLikes(likes - 1);
        } else {
            await LikeRecipe(session.user.name, recipe.slug);
            setLikes(likes + 1);
        }
        setLiked(!liked);
    }

    return (
        <Button
            onClick={(e) => { onClick?.(e); handleLikeRecipe(); }}
            style={{ color: liked ? 'grey' : 'inherit' }}
        >
            <RecommendIcon /> {likes}
        </Button>
    );
}