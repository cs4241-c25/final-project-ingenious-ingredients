export class RecipeIngredient{
    name: string;
    amount: number;
    unitOfMeasure: string;

    constructor(name: string, amount: number, unitOfMeasure: string) {
        this.name = name;
        this.amount = amount;
        this.unitOfMeasure = unitOfMeasure;
    }
}