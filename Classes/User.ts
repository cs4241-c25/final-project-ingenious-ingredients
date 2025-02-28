export class User{
    username: string;
    password: string;
    isPublic: boolean;
    favoritedRecipes: string[];
    aboutMe: string;

    constructor(username: string, password: string, isPublic: boolean, favoritedRecipes: string[] = [], aboutMe: string = ""){
        this.username = username;
        this.password = password;
        this.isPublic = isPublic;
        this.favoritedRecipes = favoritedRecipes;
        this.aboutMe = aboutMe;
    }
}