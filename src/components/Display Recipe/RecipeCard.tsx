import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import '../../app/globals.css';
import { Chip } from "@mui/material";
import { Recipe } from "../../../Classes/Recipe";
import Link from "next/link";
import LikeRecipeButton from "@/components/LikeRecipeButton";
import {SessionProvider} from "next-auth/react";
import {useSession} from "next-auth/react";
import {User} from "../../../Classes/User";
import {GetUser} from "@/Get-Post Requests/User/getUser";

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    if (!recipe) return null;

    const [user, setUser] = React.useState<User>(null);
    const { data: session } = useSession();

    React.useEffect(() => {
        async function fetchUser() {
            const user = await GetUser(session?.user?.name);
            setUser(user);
        }
        fetchUser();
    }, []);

    function getFirstThreeIngredients() {
        if (!recipe.ingredients) {
            return "No ingredients available";
        }
        if (!recipe.ingredients || recipe.ingredients.length < 3) {
            return recipe.ingredients.map(ingredient => ingredient.name).join(", ");
        }
        let firstThreeIngredients = '';
        for (let i = 0; i < 3; i++) {
            firstThreeIngredients += recipe.ingredients[i].name;
            if (i < 2) {
                firstThreeIngredients += ", ";
            }
        }
        firstThreeIngredients += "...";
        return firstThreeIngredients;
    }

    function stylizedTags() {
        if (!recipe.tags) {
            return "No tags available";
        }

        return recipe.tags.map((tag, index) => (
            <Chip key={index} label={tag} sx={{ margin: '2px' }} />
        ));
    }


    // TODO: Cards need to be all the same size, which is not the case because the ingredient list might be too long in some cases.
    return (
        <Link href={`/recipes/${recipe.slug}`}>
            <Card variant="outlined" sx={{ width: 320 }} size="lg">
                <CardOverflow>
                    <AspectRatio ratio="2">
                        <img
                            srcSet={recipe.image}
                            loading="lazy"
                            alt={recipe.name}
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography level="title-lg">{recipe.name}</Typography>
                    <Typography level="body-md">By: {recipe.creator}</Typography>
                    <Typography level="body-sm">Ingredients: {getFirstThreeIngredients()}</Typography>
                    <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                        <Divider inset="context" />
                        <CardContent orientation="horizontal">
                            <Typography
                                level="body-xs"
                                textColor="text.secondary"
                                sx={{ fontWeight: 'md' }}
                            >
                                {recipe.likes} likes
                            </Typography>
                            <Divider orientation="vertical" />
                            <Typography
                                level="body-xs"
                                textColor="text.secondary"
                                sx={{ fontWeight: 'md' }}
                            >
                                {recipe.postDate ? recipe.postDate.toDateString() : "No date available"}
                            </Typography>
                            <Divider orientation="vertical" />
                            <Typography
                                level="body-xs"
                                textColor="text.secondary"
                                sx={{ fontWeight: 'md' }}
                            >
                                Takes {recipe.prepTime}
                            </Typography>
                        </CardContent>
                    </CardOverflow>
                    <Typography level="body-sm">Tags: {stylizedTags()}</Typography>
                    <LikeRecipeButton recipe={recipe} session={session} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} />
                </CardContent>
            </Card>
        </Link>
    );
}