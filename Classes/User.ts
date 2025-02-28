export class User{
    username: string;
    password: string;
    isPublic: boolean;
    favoritedRecipes: string[];

    constructor(username: string, password: string, isPublic: boolean, favoritedRecipes: string[] = []){
        this.username = username;
        this.password = password;
        this.isPublic = isPublic;
        this.favoritedRecipes = favoritedRecipes;
    }
}