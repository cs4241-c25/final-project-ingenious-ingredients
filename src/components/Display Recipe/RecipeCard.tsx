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

    function getFirstThreeTags() {
        if (!recipe.tags) {
            return "No ingredients available";
        }
        if (recipe.tags.length < 3) {
            return recipe.tags.map((tag, index) => (
                <Chip key={index} label={tag} sx={{ margin: '2px' }} />
            ));
        }
        return recipe.tags.slice(0, 3).map((tag, index) => (
            <Chip key={index} label={tag} sx={{ margin: '2px', color: 'white', fontWeight: 'bold', backgroundColor: '#F06449' }} />
        ));
    }

    // TODO: Cards need to be all the same size, which is not the case because the ingredient list might be too long in some cases.
    return (
        <Link href={`/recipes/${recipe.slug}`}>
            <Card variant="plain" sx={{ width: 320, height: 400, boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.5)', outline: '1px solid #000' }} size="lg">
                <CardOverflow>
                    <AspectRatio ratio="2">
                        <img
                            srcSet={recipe.image || "https://t3.ftcdn.net/jpg/01/39/36/90/360_F_139369055_cEuu2JfR1qX8hFEcLb00PZos03g0ci24.jpg"}
                            loading="lazy"
                            alt={recipe.name}
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography level="title-lg" sx={{ minHeight: '2em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {recipe.name}
                    </Typography>
                    <Typography level="body-md">By: {recipe.creator}</Typography>
                    <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                        <Divider inset="context" />
                        <CardContent orientation="horizontal">
                            <Typography
                                level="body-xs"
                                textColor="text.secondary"
                                sx={{ fontWeight: 'md' }}
                            >
                                <LikeRecipeButton recipe={recipe} session={session} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} />
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
                    <Typography level="body-sm">Tags: {getFirstThreeTags()}</Typography>
                </CardContent>
            </Card>
        </Link>
    );
}