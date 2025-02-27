import NavBar from "@/components/NavBar";
import React, {JSX} from "react";

export default function MyPantryPage() {
    return (
        <div>
            <NavBar stickOrNah={"sticky"}/>
            <div className="bg-white caret-black p-8">
                <h1>My Pantry</h1>
                {/*<RecipeGrid colNum={3}/>*/}
                {/*<BrowseFilterTags/>*/}
            </div>
        </div>
    );
}