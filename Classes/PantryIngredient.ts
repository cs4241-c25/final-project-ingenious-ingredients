export class PantryIngredient{
    name: string;
    amount: string;
    unitOfMeasure: string;
    buyDate: string;
    username: string;

    constructor(name: string, amount: string, unitOfMeasure: string, username: string){
        this.name = name;
        this.amount = amount;
        this.unitOfMeasure = unitOfMeasure;
        const currentDate = new Date()
        this.buyDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        this.username = username;
    }
}