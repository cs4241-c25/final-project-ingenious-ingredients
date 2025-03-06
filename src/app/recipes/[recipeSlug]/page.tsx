import { notFound } from 'next/navigation';
import { GetRecipeFromSlug } from "@/Get-Post Requests/Recipe/getRecipeFromSlug";
import NavBar from "@/components/NavBar";
import classes from "./page.module.css";
import Link from "next/link";
import IngredientsBox from "@/components/IngredientsBox";
import EditRecipeButton from "@/components/Edit Recipe/EditRecipeButton";
import {Chip} from "@mui/material";
import Button from "@mui/material/Button";
import StepsBox from "@/components/Display Recipe/StepsBox";
import Typography from "@mui/material/Typography";
import React from "react";

export async function generateMetadata({ params }) {
    const { recipeSlug } = await params;
    const recipe = await GetRecipeFromSlug(recipeSlug);
    if (!recipe) { notFound(); }

    return {
        title: recipe.name,
        description: recipe.name,
    };
}

export default async function RecipeDetailsPage({ params }) {
    const { recipeSlug } = await params;
    const recipe = await GetRecipeFromSlug(recipeSlug);

    if (!recipe) {
        return <p>Recipe not found or steps are missing.</p>;
    }

    // Convert the Recipe instance to a plain object
    const recipeObject = {
        steps: recipe.steps,
        name: recipe.name,
        creator: recipe.creator,
        isPublic: recipe.isPublic,
        likes: recipe.likes,
        ingredients: recipe.ingredients,
        prepTime: recipe.prepTime,
        mealType: recipe.mealType,
        postDate: recipe.postDate,
        tags: recipe.tags,
        slug: recipe.slug,
        image: recipe.image
    };

    function stylizedTags() {
        if (!recipe.tags) {
            return "No ingredients available";
        }
        return recipe.tags.map((tag, index) => (
            <Chip key={index} label={tag} sx={{ margin: '2px', color: 'white', fontWeight: 'bold', backgroundColor: '#F06449' }} />
        ));
    }

    // TODO: It might look nicer for the properties of the recipe to be displayed as chips
    // TODO: If session.user === recipe.creator, show an edit button
    return (
        <div style={{backgroundImage: "url('/emoji-grid-2.svg')", minHeight: "110vh"}}>
            <div style={{backgroundColor: "#fff0"}}>
                <NavBar stickOrNah={"sticky"}/>
                <div className={classes.recipeHeader} style={{marginBottom: "2rem", borderBottom: "#F06449", borderBottomWidth: "8px", borderBottomStyle: "solid"}}>
                    <div style={{marginRight: "5rem"}}>
                        <img src={recipe.image} alt={recipe.name}
                             style={{maxWidth: "100%", maxHeight: "100%", objectFit: "cover"}}/>
                    </div>
                    <div className={classes.recipeHeaderRight}>
                    <div style={{position: "absolute", top: "5rem", right: "1rem"}}>
                            <EditRecipeButton recipe={recipeObject}/>
                        </div>
                        <Typography variant='h2' sx={{
                            marginBottom: "1.5rem",
                            marginTop: "1rem",
                            fontWeight: "bold", textDecoration:"underline",
                            textDecorationColor: "#F08148", textUnderlineOffset: "4px"
                        }}>
                            {recipe.name}
                        </Typography>
                        <Link href={`/authors/${recipe.creator}`}>
                            <Button>by {recipe.creator}</Button>
                        </Link>
                        <p>Prep Time: <Chip label={<b>{recipe.prepTime}</b>} color="primary"
                                            style={{backgroundColor: "#F06449"}}/></p>
                        <p>Likes: <Chip label={<b>{recipe.likes}</b>} color="primary"
                                        style={{backgroundColor: "#F06449"}}/></p>
                        <p>Posted on: <Chip label={
                            <b>{recipe.postDate ? new Date(recipe.postDate).toDateString() : "No date available"}</b>}
                                            color="primary" style={{backgroundColor: "#F06449"}}/></p>
                        <Typography variant="body1">Tags: {stylizedTags()}</Typography>
                    </div>
                </div>
                <div className={classes.recipeContent} style={{marginBottom: "2rem"}}>
                    <IngredientsBox ingredients={recipe.ingredients}/>
                    <StepsBox steps={recipe.steps}/>
                </div>
            </div>
        </div>
    );
}