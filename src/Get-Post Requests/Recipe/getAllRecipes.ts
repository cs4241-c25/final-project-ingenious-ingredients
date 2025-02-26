import { Recipe } from "../../../Classes/Recipe";

export async function GetAllRecipes(): Promise<Recipe[]> {
    const results = await fetch('http://localhost:3000/getAllRecipes', {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    });

    const recipeList: Recipe[] = [];
    const list = await results.json();
    for (let i = 0; i < list.length; i++) {
        recipeList.push(new Recipe(
            list[i].steps,
            list[i].name,
            list[i].creator,
            list[i].isPublic,
            list[i].prepTime,
            list[i].mealType,
            list[i].likes,
            list[i].postDate,
            list[i].ingredients,
            list[i].tags
        ));
    }

    console.log("list of recipes: " + recipeList);
    return recipeList;
}