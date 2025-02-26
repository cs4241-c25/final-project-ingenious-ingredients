import {Recipe} from "./Recipe";

export class User{
    username: string;
    password: string;
    isPublic: boolean;
    favoritedRecipes: Recipe[];

    constructor(username: string, password: string, isPublic: boolean, favoritedRecipes: Recipe[] = null){
        this.username = username;
        this.password = password;
        this.isPublic = isPublic;
        this.favoritedRecipes = favoritedRecipes;
    }
}