import {Step} from "./Step";
import {RecipeIngredient} from "./RecipeIngredient";
import slugify from "slugify";

export class Recipe{
    steps: Step[];
    name: string;
    creator: string;
    isPublic: boolean;
    likes: number = 0;
    ingredients: RecipeIngredient[];
    prepTime: number;
    mealType: string;
    postDate: Date;
    tags: string[];
    slug: string;

    // TODO: Prep time should include hours and minutes (e.g. 1 hour 30 minutes)
    constructor(steps: Step[], name: string, creator: string, isPublic: boolean, prepTime: number, mealType: string, likes: number = 0, postDate: Date = null, ingredients: RecipeIngredient[] = null, tags: string[] = null, slug : string = null){
        this.steps = steps;
        this.name = name;
        this.creator = creator;
        this.isPublic = isPublic;
        this.prepTime = prepTime;
        this.mealType = mealType;
        const slugVal = name + "-" + creator;
        this.slug = slugify(slugVal, {lower: true});   // NOTE: something should be done to ensure that this slug is unique
        this.tags = tags;
        if (postDate === null){
            this.postDate = new Date();
        }
        else {
            this.postDate = postDate;
        }
        if (likes === 0){
            this.likes = 0;
        }
        else {
            this.likes = likes;
        }
        if (ingredients === null){
            this.ingredients = [];
            for (let i = 0; i < this.steps.length; i++){
                for (let j = 0; j < this.steps[i].ingredients.length; j++){
                    const containsIngredient = this.ingredients.some(ingredient => {
                        return ingredient.name === this.steps[i].ingredients[j].name;
                    });
                    if (containsIngredient){
                        const ingredientToChange = this.ingredients.find(item => item.name === this.steps[i].ingredients[j].name);
                        ingredientToChange.amount += this.steps[i].ingredients[j].amount;
                    }
                    else {
                        const newIngredient = new RecipeIngredient(this.steps[i].ingredients[j].name, this.steps[i].ingredients[j].amount, this.steps[i].ingredients[j].unitOfMeasure);
                        this.ingredients.push(newIngredient);
                    }
                }
            }
        }
        else{
            this.ingredients = ingredients;
        }
    }
}