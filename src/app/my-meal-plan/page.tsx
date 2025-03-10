import NavBar from "@/components/NavBar";
import React from "react";
import TimerPopup from "@/components/TimerPopup";
import CustomTimer from "@/components/CustomTimer";

export default function MyMealPlanPage() {
    let duration = 40;
    return (
        <div>
            <NavBar stickOrNah={"sticky"}/>
            <div className="bg-white caret-black p-8">
                <h1>My Meal Plan</h1>
            </div>
        </div>
    );
}