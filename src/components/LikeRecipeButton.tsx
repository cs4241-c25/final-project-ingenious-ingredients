import {LikeRecipe} from "@/Get-Post Requests/Recipe/likeRecipe";
import Button from "@mui/material/Button";
import RecommendIcon from '@mui/icons-material/Recommend';
import {Session} from "next-auth";
import {Recipe} from "../../Classes/Recipe";

interface LikeRecipeButtonProps {
    recipe: Recipe;
    session: Session;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function LikeRecipeButton({ recipe, session, onClick }: LikeRecipeButtonProps) {

    function handleLikeRecipe() {
        if (!session || !session.user) {
            return alert("You must be logged in to like a recipe");
        }

        // TODO: If user has already liked this recipe, unlike it. Tommy will make this endpoint soon.

        LikeRecipe(session.user.name, recipe.slug);
    }

    return (
        <Button onClick={(e) => { onClick?.(e); handleLikeRecipe(); }}>
            <RecommendIcon/> Like {recipe.likes}
        </Button>
    )
}