export class PantryIngredient{
    name: string;
    amount: number;
    unitOfMeasure: string;
    buyDate: string;
    username: string;

    constructor(name: string, amount: number, unitOfMeasure: string, username: string, buyDate : string = null){
        this.name = name;
        this.amount = amount;
        this.unitOfMeasure = unitOfMeasure;
        const currentDate = new Date()
        this.buyDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        this.username = username;
    }
}