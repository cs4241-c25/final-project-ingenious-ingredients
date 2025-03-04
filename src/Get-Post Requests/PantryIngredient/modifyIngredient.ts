import {PantryIngredient} from "../../../Classes/PantryIngredient";

export async function ModifyIngredient(username: string, name: string, ingredient: PantryIngredient){
    const json = {
        username: username,
        name: name,
        ingredient: ingredient
    }

    const body = JSON.stringify(json);

    const result = await fetch('http://localhost:3000/modifyIngredient', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await result.json();
}