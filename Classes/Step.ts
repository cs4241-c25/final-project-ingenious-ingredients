import {RecipeIngredient} from "./RecipeIngredient";

export class Step{
    instruction: string;
    ingredients: RecipeIngredient[];

    constructor(instruction: string, ingredients: RecipeIngredient[]){
        this.instruction = instruction;
        this.ingredients = ingredients;
    }
}