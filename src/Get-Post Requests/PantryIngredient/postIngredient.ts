import {PantryIngredient} from "../../../Classes/PantryIngredient";

export async function PostIngredient(ingredient: PantryIngredient){
    const json = {
        ingredient: ingredient
    }

    const body = JSON.stringify(json);

    const result = await fetch('http://localhost:3000/postIngredient', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await result.text();
}