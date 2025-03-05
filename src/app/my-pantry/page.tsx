"use client";

import React, { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar";
import IngredientsTable from "@/components/IngredientsTable";

export default function MyPantryPage() {

    return (
        <div style={{backgroundImage: "url('/emoji-grid-2.svg')", minHeight: "110vh"}}>
            <div style={{backgroundColor: "#fff0"}}>
                <NavBar stickOrNah={'static'}/>

                <div className="p-8">
                    <IngredientsTable/>
                </div>
            </div>
        </div>
    );
}