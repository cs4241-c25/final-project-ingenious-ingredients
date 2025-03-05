import NavBar from "@/components/NavBar";
import React from "react";
import TimerPopup from "@/components/TimerPopup";
import CustomTimer from "@/components/CustomTimer";

export default function MyMealPlanPage() {
    let duration = 40;
    return (
        <div style={{backgroundImage: "url('/emoji-grid-2.svg')", minHeight: "110vh"}}>
            <NavBar stickOrNah={"sticky"}/>
            <div className="bg-white caret-black p-8" style={{backgroundColor: "#fff0"}}>
                {/*<TimerPopup/>*/}
                <CustomTimer/>
            </div>
        </div>
    );
}