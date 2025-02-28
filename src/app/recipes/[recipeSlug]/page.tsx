import { notFound } from 'next/navigation';
import { GetRecipe } from "@/Get-Post Requests/Recipe/getRecipe";
import { GetRecipeFromSlug } from "@/Get-Post Requests/Recipe/getRecipeFromSlug";
import {Recipe} from "../../../../Classes/Recipe";

export async function generateMetadata({ params }) {
    const recipe = Recipe | null = await GetRecipe(params.recipe.name, params.recipe.creator);
    if (!recipe) { notFound(); }

    return {
        title: recipe.name,
        description: recipe.name,
    };
}

export default function RecipeDetailsPage({ params }) {
    const recipe = GetRecipeFromSlug(params.slug);
    const recipeSteps = recipe.steps;

    if (!recipe) {
        return <p>Recipe not found or steps are missing.</p>;
    }

    console.log("these are the recipe steps: " + recipe.steps);

    // convert recipe steps into a more readable format
    // let formattedSteps = recipe.steps.map((step, index) => (
    //     <li key={index}>{step}</li>
    // ));

    return (
        <>
            // navbar
            <header>
                <div>
                    {/*<Image*/}
                    {/*    src={`https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com/${recipe.image}`}*/}
                    {/*    alt={recipe.name}*/}
                    {/*    fill*/}
                    {/*/>*/}
                </div>
                <div>
                    <h1>{recipe.name}</h1>
                    <p>
                        by {recipe.creator}
                    </p>
                </div>
            </header>
            <main>
                <ol>
                    {/*{formattedSteps}*/}
                    hi
                </ol>
            </main>
        </>
    );
}