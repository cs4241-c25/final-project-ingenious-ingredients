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
                {/*<RecipeGrid colNum={3}/>*/}
                {/*<BrowseFilterTags/>*/}
                {/*<TimerPopup duration={10}/>*/}
                <CustomTimer
                    colors={['#FF0000', '#00FF00']}
                    colorValues={[30, 60]}
                />
            </div>
        </div>
    );
}