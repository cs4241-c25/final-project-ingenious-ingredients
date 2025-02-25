import * as React from 'react';
import RecipeCard from "./RecipeCard";
import Grid2 from "@mui/material/Grid2";

interface RecipeGridProps {
    colNum: number
}

const RecipeGrid: React.FC<RecipeGridProps> = ({colNum}) => {

    //need to make a populate RecipeCard function && make a populate items funct.
    const items = [RecipeCard, RecipeCard, RecipeCard, RecipeCard, RecipeCard, RecipeCard, RecipeCard];

    return (
        <Grid2 container spacing={3} columns={colNum} sx={{ width: '100%', margin: "auto", padding: 2, justifyContent: "center"}}>
            {items.map((item, index) => (
                <Grid2 sx={{xs: 6, sm: 4, md: 3, justifyContent: "center"}} key={index} component="div">
                    <RecipeCard/>
                </Grid2>
            ))}
        </Grid2>
    );
}

export default RecipeGrid;
