import { notFound } from 'next/navigation';
import { GetRecipeFromSlug } from "@/Get-Post Requests/Recipe/getRecipeFromSlug";
import { Recipe } from "../../../../Classes/Recipe";
import NavBar from "@/components/NavBar";
import classes from "./page.module.css";
import Link from "next/link";
import {Box} from "@material-ui/core";
import IngredientsBox from "@/components/IngredientsBox";
import EditRecipeButton from "@/components/Edit Recipe/EditRecipeButton";
import {Chip} from "@mui/material";
import Button from "@mui/material/Button";
import StepsBox from "@/components/Display Recipe/StepsBox";

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

    // TODO: It might look nicer for the properties of the recipe to be displayed as chips
    // TODO: If session.user === recipe.creator, show an edit button
    return (
        <div style={{backgroundImage: "url('/emoji-grid-2.svg')", minHeight: "110vh"}}>
            <div style={{backgroundColor: "#fff0"}}>
                <NavBar stickOrNah={"sticky"}/>
                <div className={classes.recipeHeader}>
                    <div className={classes.recipeHeaderLeft}>
                        <img src={recipe.image} alt={recipe.name} className="recipe-image"/>
                    </div>
                    <div className={classes.recipeHeaderRight}>
                        <EditRecipeButton recipe={recipeObject}/>
                        <h1 className={classes.recipeName}>{recipe.name}</h1>
                        <Link href={`/authors/${recipe.creator}`}>
                            <Button>by {recipe.creator}</Button>
                        </Link>
                        <p>Prep Time: <Chip label={recipe.prepTime} color="primary" style={{ backgroundColor: "#F06449" }}/></p>
                        <p>Likes: <Chip label={recipe.likes} color="primary" style={{ backgroundColor: "#F06449" }}/></p>
                        <p>Posted
                            on: <Chip label={recipe.postDate ? new Date(recipe.postDate).toDateString() : "No date available"} color="primary" style={{ backgroundColor: "#F06449" }}/></p>
                    </div>
                </div>
                <hr className={classes.hr}/>
                <div className={classes.recipeContent}>
                    <IngredientsBox ingredients={recipe.ingredients}/>
                    <StepsBox steps={recipe.steps}/>
                </div>
            </div>
        </div>
    );
}