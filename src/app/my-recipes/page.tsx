import NavBar from "@/components/NavBar";
import React from "react";

export default function MyRecipesPage() {
    return (
        <div>
            <NavBar stickOrNah={"sticky"}/>
            <div className="bg-white caret-black p-8">
                <h1>My Recipes</h1>
                {/*<RecipeGrid colNum={3}/>*/}
                {/*<BrowseFilterTags/>*/}
            </div>
        </div>
    );
}