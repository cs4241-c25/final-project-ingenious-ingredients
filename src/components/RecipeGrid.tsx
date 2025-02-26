import * as React from 'react';
import RecipeCard from "./RecipeCard";
import Grid2 from "@mui/material/Grid2";

interface RecipeGridProps {
    colNum: number
}

const RecipeGrid: React.FC<RecipeGridProps> = ({colNum}) => {

    // TODO: need to make a populate RecipeCard function && make a populate items funct.
    const items = [RecipeCard, RecipeCard, RecipeCard, RecipeCard, RecipeCard, RecipeCard, RecipeCard];

    return (
        <Grid2 container spacing={3} columns={colNum} sx={{ width: '100%', margin: "auto", padding: 2, justifyContent: "center"}}>
            {items.map((item, index) => (
                <Grid2 sx={{xs: 6, sm: 4, md: 3, justifyContent: "center"}} key={index} component="div">
                    <RecipeCard name={"Cheeseburger"} creator={"Andrew"} prepTime={"30 minutes"} image={"https://upload.wikimedia.org/wikipedia/commons/4/4d/Cheeseburger.jpg"} likes={23} postDate={"February 1, 2025"} ingredients={["beef", "cheese", "lettuce"]} tags={["delicious", "yummy", "cool"]}/>
                </Grid2>
            ))}
        </Grid2>
    );
}

export default RecipeGrid;
