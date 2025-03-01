import { notFound } from 'next/navigation';
import { GetRecipeFromSlug } from "@/Get-Post Requests/Recipe/getRecipeFromSlug";
import { Recipe } from "../../../../Classes/Recipe";
import NavBar from "@/components/NavBar";
import classes from "./page.module.css";
import Link from "next/link";

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

    return (
        <div>
            <NavBar stickOrNah={"sticky"}/>
            <div className={classes.recipeHeader}>
                <div className={classes.recipeHeaderLeft}>
                    <img src={recipe.image} alt={recipe.name} className="recipe-image"/>
                </div>
                <div className={classes.recipeHeaderRight}>
                    <h1 className={classes.recipeName}>{recipe.name}</h1>
                    <Link href={`/author`}>
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
                <div className={classes.recipeContentIngredients}>
                    <h2 className={classes.recipeContentHeaderName}>Ingredients</h2>
                    <ol>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.name}, {ingredient.amount} {ingredient.unitOfMeasure}</li>
                        ))}
                    </ol>
                </div>
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