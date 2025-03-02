import {PantryIngredient} from "../../../Classes/PantryIngredient";

export async function GetIngredientsByUser(user: string){
    const json = {
        username: user
    }

    const body = JSON.stringify(json);

    const result = await fetch('http://localhost:3000/getIngredientsByUser', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    const ingredients : PantryIngredient[] = [];
    const list = await result.json();
    for (let i = 0; i < list.length; i++){
        ingredients.push(new PantryIngredient(list[i].name, list[i].amount, list[i].unitOfMeasure, list[i].username, list[i].buyDate));
    }
    return(ingredients);
}