import { notFound } from 'next/navigation';
import { GetRecipeFromSlug } from "@/Get-Post Requests/Recipe/getRecipeFromSlug";
import { Recipe } from "../../../../Classes/Recipe";
import NavBar from "@/components/NavBar";
import classes from "./page.module.css";
import Link from "next/link";
import {Box} from "@material-ui/core";
import IngredientsBox from "@/components/IngredientsBox";
import EditRecipeButton from "@/components/Edit Recipe/EditRecipeButton";

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
        <div>
            <NavBar stickOrNah={"sticky"}/>
            <div className={classes.recipeHeader}>
                <div className={classes.recipeHeaderLeft}>
                    <img src={recipe.image} alt={recipe.name} className="recipe-image"/>
                </div>
                <div className={classes.recipeHeaderRight}>
                    <EditRecipeButton recipe={recipeObject}/>
                    <h1 className={classes.recipeName}>{recipe.name}</h1>
                    <Link href={`/authors/${recipe.creator}`}>
                        <p>by {recipe.creator}</p>
                    </Link>
                    <p>Prep Time: {recipe.prepTime}</p>
                    <p>Meal Type: {recipe.mealType}</p>
                    <p>Likes: {recipe.likes}</p>
                    <p>Posted on: {recipe.postDate ? new Date(recipe.postDate).toDateString() : "No date available"}</p>
                </div>
            </div>
            <hr className={classes.hr}/>
            <div className={classes.recipeContent}>
                <IngredientsBox ingredients={recipe.ingredients} />
                <div className={classes.recipeContentSteps}>
                    <h2 className={classes.recipeContentHeaderName}>Steps</h2>
                    <ul>
                        {recipe.steps.map((step, index) => (
                            <li key={index}>
                                <p>{step.instruction}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}