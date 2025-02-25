import {Recipe} from "../../../Classes/Recipe";

export async function GetRecipe(name: string, creator: string){
    const json = {
        name: name,
        creator: creator
    }

    const body = JSON.stringify(json);

    const results = await fetch('http://localhost:3000/getRecipe', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    const recipe = await results.json();

    return new Recipe(recipe.steps, recipe.name, recipe.creator, recipe.isPublic, recipe.prepTime, recipe.mealType, recipe.likes, recipe.postDate, recipe.ingredients, recipe.tags);
}