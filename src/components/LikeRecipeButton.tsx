import { LikeRecipe } from "@/Get-Post Requests/Recipe/likeRecipe";
import Button from "@mui/material/Button";
import RecommendIcon from '@mui/icons-material/Recommend';
import { Session } from "next-auth";
import { Recipe } from "../../Classes/Recipe";
import React, { useState } from "react";

interface LikeRecipeButtonProps {
    recipe: Recipe;
    session: Session;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function LikeRecipeButton({ recipe, session, onClick }: LikeRecipeButtonProps) {
    const [likes, setLikes] = useState(recipe.likes);

    async function handleLikeRecipe() {
        if (!session || !session.user) {
            return alert("You must be logged in to like a recipe");
        }

        // TODO: If user has already liked this recipe, unlike it. Tommy will make this endpoint soon.
        // TODO: If user has already liked this recipe, grey out the button or change color or something.

        await LikeRecipe(session.user.name, recipe.slug);
        setLikes(likes + 1); // Update the likes state to trigger a re-render
    }

    return (
        <Button onClick={(e) => { onClick?.(e); handleLikeRecipe(); }}>
            <RecommendIcon /> {likes}
        </Button>
    );
}