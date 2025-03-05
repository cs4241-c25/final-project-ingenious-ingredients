"use client";

import { Box } from "@material-ui/core";
import React from "react";
import classes from "../app/recipes/[recipeSlug]/page.module.css";

const IngredientsBox = ({ ingredients }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: "30%", padding: "20px", bgcolor: "#F2D6C7", borderRadius: "10px", borderTop: "8px solid #F06449",
        borderLeft: "3px solid #F06449", borderRight: "3px solid #F06449", borderBottom: "8px solid #F06449" }}>
        <h2 className={classes.recipeContentHeaderName}>Ingredients</h2>
        <ol className={classes.bulletList} style={{marginLeft: "1rem"}}>
            {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}, {ingredient.amount} {ingredient.unitOfMeasure}</li>
            ))}
        </ol>
    </Box>
);

export default IngredientsBox;