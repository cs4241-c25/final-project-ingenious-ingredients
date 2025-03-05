"use client";

import { Box } from "@material-ui/core";
import React from "react";
import classes from "../../app/recipes/[recipeSlug]/page.module.css";

const StepsBox = ({ steps }) => (
    <div className={classes.recipeContentSteps}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: "90%", padding: "20px", bgcolor: "#F2D6C7", borderRadius: "10px", borderTop: "8px solid #F06449",
            borderLeft: "3px solid #F06449", borderRight: "3px solid #F06449", borderBottom: "8px solid #F06449", marginLeft: "5%" }}>
            <h2 className={classes.recipeContentHeaderName}>Steps</h2>
            <ul style={{marginLeft: "1rem"}}>
                {steps.map((step, index) => (
                    <li key={index}>
                        <p>{step.instruction}</p>
                    </li>
                ))}
            </ul>
        </Box>
    </div>
);

export default StepsBox;