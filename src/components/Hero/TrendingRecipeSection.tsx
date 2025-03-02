import React, {useEffect, useState} from 'react';
import {Box, Icon, Typography} from "@mui/material";
import RecipeGrid from "@/components/Display Recipe/RecipeGrid";
import {Recipe} from "../../../Classes/Recipe";
import {useSession} from "next-auth/react";
import GetAllRecipes from "@/Get-Post Requests/Recipe/getAllRecipes";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {redirect} from "next/navigation";


const TrendingSection = () => {

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const {data: session} = useSession();

    useEffect(() => {
        async function fetchRecipes() {
            const fetchedRecipes = await GetAllRecipes();
            setRecipes(fetchedRecipes);
        }
        fetchRecipes();
    }, []);

    const handleRecipeRedirect = () => {
        redirect("/recipes");
    }

    return(
        <Box sx={{
            display: "flex", flexDirection: "column"
        }}>
            <Box sx={{
              display: "flex", flexDirection: "column",
              bgcolor: "#F2D6C7", padding: "2rem", borderTop: "8px solid #F06449",
              borderLeft: "3px solid #F06449", borderRight: "3px solid #F06449",
              borderTopLeftRadius: "0.3rem", borderTopRightRadius: "0.3rem"
            }}>
              <Typography variant='h2' sx={{marginBottom: "1.5rem",
                  fontWeight: "bold", textDecoration:"underline",
                  textDecorationColor: "#F08148", textUnderlineOffset: "4px"
              }}>
                  Trending Recipes
              </Typography>
              <RecipeGrid colNum={3} recipes={recipes} maxRecipes={3}/>
            </Box>
            <Box onClick={handleRecipeRedirect} sx={{display:'flex', alignItems:"center", justifyContent: 'center',
                background: "linear-gradient(to bottom, rgba(242, 214, 199, 1), rgba(242, 214, 199,0))",
                borderLeft: "3px solid #F06449", borderRight: "3px solid #F06449", paddingBottom: "2rem",
                "&:hover": {cursor: "pointer"}
            }}>
                <KeyboardDoubleArrowDownIcon sx={{fontSize: 50, color: "#F06449"}}/>
            </Box>
        </Box>
    );

}

export default TrendingSection;