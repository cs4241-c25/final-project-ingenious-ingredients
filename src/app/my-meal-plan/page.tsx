import NavBar from "@/components/NavBar";
import React from "react";

export default function MyMealPlanPage() {
    return (
        <div>
            <NavBar stickOrNah={"sticky"}/>
            <div className="flex items-center justify-center h-96 bg-fixed bg-parallax bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488992783499-418eb1f62d08?q=80&w=3389&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                <div className="text-center">
                    <h1 className="text-8xl font-bold mb-4 border-4 text-white">TAKE CONTROL OF YOUR KITCHEN</h1>
                    <p className="text-4xl font-bold text-white">Let Them Cook!</p>
                </div>
            </div>
            <div className="bg-white p-8">
                <h1>My Meal Plan</h1>
                {/*<RecipeGrid colNum={3}/>*/}
                {/*<BrowseFilterTags/>*/}
            </div>
        </div>
    );
}