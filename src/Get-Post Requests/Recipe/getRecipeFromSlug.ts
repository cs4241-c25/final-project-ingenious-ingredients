import {Recipe} from "@/Classes/Recipe";

export async function GetRecipeFromSlug(slug: string): Promise<Recipe> {
    const json = {
        slug: slug
    }

    const body = JSON.stringify(json);

    const results = await fetch('http://localhost:3000/getRecipeFromSlug', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    const recipe = await results.json();

    return new Recipe (
        recipe.steps,
        recipe.name,
        recipe.creator,
        recipe.isPublic,
        recipe.prepTime,
        recipe.mealType,
        recipe.likes,
        recipe.postDate,
        recipe.ingredients,
        recipe.tags,
        recipe.slug,
        recipe.image
    );
}