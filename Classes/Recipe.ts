import { RecipeStep } from "./Step";
import { RecipeIngredient } from "./RecipeIngredient";
import slugify from "slugify";

export class Recipe {
    steps: RecipeStep[];
    name: string;
    creator: string;
    isPublic: boolean;
    likes: number = 0;
    ingredients: RecipeIngredient[];
    prepTime: string;
    mealType: string;
    postDate: Date;
    tags: string[];
    slug: string;
    image: string;

    constructor(steps: RecipeStep[], name: string, creator: string, isPublic: boolean, prepTime: string, mealType: string, likes: number = 0, postDate: Date | string = null, ingredients: RecipeIngredient[] = null, tags: string[] = null, slug: string = null, image: string) {
        this.steps = steps;
        this.name = name;
        this.creator = creator;
        this.isPublic = isPublic;
        this.prepTime = prepTime;
        this.mealType = mealType;
        this.image = image;
        this.slug = slug && slug.trim() !== "" ? slug : slugify(name + "-" + creator, { lower: true });
        this.tags = tags;
        if (postDate === null) {
            this.postDate = new Date();
        } else {
            this.postDate = new Date(postDate);
        }
        if (likes === 0) {
            this.likes = 0;
        } else {
            this.likes = likes;
        }
        if (ingredients === null) {
            this.ingredients = [];
            for (let i = 0; i < this.steps.length; i++) {
                for (let j = 0; j < this.steps[i].ingredients.length; j++) {
                    const containsIngredient = this.ingredients.some(ingredient => {
                        return ingredient.name === this.steps[i].ingredients[j].name;
                    });
                    if (containsIngredient) {
                        const ingredientToChange = this.ingredients.find(item => item.name === this.steps[i].ingredients[j].name);
                        ingredientToChange.amount += this.steps[i].ingredients[j].amount;
                    } else {
                        const newIngredient = new RecipeIngredient(this.steps[i].ingredients[j].name, this.steps[i].ingredients[j].amount, this.steps[i].ingredients[j].unitOfMeasure);
                        this.ingredients.push(newIngredient);
                    }
                }
            }
        } else {
            this.ingredients = ingredients;
        }
        if (image === null) {
            this.image = "https://t3.ftcdn.net/jpg/01/39/36/90/360_F_139369055_cEuu2JfR1qX8hFEcLb00PZos03g0ci24.jpg";
        }
    }
}