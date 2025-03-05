"use client";
import NavBar from "@/components/NavBar";
import React, {useState, useEffect} from "react";
import CustAvatar from "@/components/CustAvatar";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import SocialButtons from "@/components/SocialButtons";
import {GetUser} from "@/Get-Post Requests/User/getUser";
import GetRecipesByUser from "@/Get-Post Requests/Recipe/getRecipesByUser";
import RecipeGrid from "@/components/Display Recipe/RecipeGrid";
import {useParams} from "next/navigation";
import Button from "@mui/material/Button";
import {Collapse} from "@mui/material";
import {Box, Typography} from "@mui/material";
import BrowseFilterTags from "@/components/Display Recipe/BrowseFilterTags"
import {GetRecipesByTags} from "@/Get-Post Requests/Recipe/getRecipesByTags";
import {GetRecipeFromSlug} from "@/Get-Post Requests/Recipe/getRecipeFromSlug";


export default function Author() {
    const params = useParams();
    const authorsSlug = params.authorsSlug;
    const slug = Array.isArray(authorsSlug) ? authorsSlug[0] : authorsSlug;

    const [user, setUser] = useState(null);
    const [myRecipes, setMyRecipes] = useState([]);
    const [myRecipeExpanded, setMyRecipeExpanded] = useState(true);
    const [myLikedExpanded, setMyLikedExpanded] = useState(false);
    const [likedRecipes, setLikedRecipes] = useState([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filteredMyRecipes, setFilteredMyRecipes] = useState([]);
    const [filteredLikedRecipes, setFilteredLikedRecipes] = useState([]);

    useEffect(() => {
        if(!slug) return;

        async function fetchData() {
            try{
                const fetchedUser = await GetUser(slug as string);
                if (fetchedUser) {
                    setUser(fetchedUser);
                    const fetchedMyRecipes = await GetRecipesByUser(fetchedUser.username);

                    let fetchedRecipeArray = [];

                    for (let i = 0; i < fetchedUser.favoritedRecipes.length; i++){
                        const fetchedLikedRecipes = await GetRecipeFromSlug(fetchedUser.favoritedRecipes[i]);
                        fetchedRecipeArray.push(fetchedLikedRecipes);
                    }


                    setMyRecipes(fetchedMyRecipes);
                    setLikedRecipes(fetchedRecipeArray);

                    setFilteredMyRecipes(fetchedMyRecipes);
                    setFilteredLikedRecipes(fetchedRecipeArray);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [slug]);

    useEffect(() => {
       if(selectedTags.length === 0) {
           setFilteredMyRecipes(myRecipes);
           setFilteredLikedRecipes(likedRecipes);
       } else {
           const filterByTags = (recipes: any[]) =>
               recipes.filter(recipe => recipe.tags && selectedTags.every(tag => recipe.tags.includes(tag)));

           setFilteredLikedRecipes(filterByTags(likedRecipes));
           setFilteredMyRecipes(filterByTags(myRecipes));
       }
    }, [selectedTags,myRecipes,likedRecipes]);

    if (!user) {
        return <p>User not found.</p>;
    }

    const handleTagsChange = (newTags: string[]) =>{
        setSelectedTags(newTags);
    }

    const handleMyRecipeExpand = () => {
        setMyRecipeExpanded(!myRecipeExpanded);
    };

    const handleMyLikedExpand = () => {
        setMyLikedExpanded(!myLikedExpanded);
    }


    return (
        <div style={{backgroundImage: "url('/emoji-grid-2.svg')"}}>
            <div style={{backgroundColor: "#fff0"}}>
            <NavBar stickOrNah={"sticky"}/>
            <div className="page-background">
                <div>
                    <div id="authorNameDescrip">
                        <div id="authorName">
                            <CustAvatar userName={user.username}/>
                        </div>
                        <div id="authorDescrip">
                            <p color="black ">About Me</p>
                            <TextField
                                multiline
                                rows={5}
                                defaultValue={user.aboutMe}
                                disabled
                                sx={{
                                    width: 650,
                                    backgroundColor: '#F2D6C7',
                                    color: 'black',
                                }}
                            />
                            <SocialButtons/>
                        </div>
                    </div>
                </div>


                <br/>
                <br/>
                <br/>
                <Divider id="divide" orientation="horizontal" flexItem/>

                <Box sx={{display: 'flex', padding: '20px'}}>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: "20%",
                        padding: "20px",
                        bgcolor: "#F2D6C7",
                        borderRadius: "10px",
                        borderTop: "8px solid #F06449",
                        borderLeft: "3px solid #F06449",
                        borderRight: "3px solid #F06449",
                        borderBottom: "8px solid #F06449"
                    }}>

                        <BrowseFilterTags onTagsChange={handleTagsChange}
                                          disabled={!myRecipeExpanded && !myLikedExpanded}/>

                        <Button variant='contained' onClick={handleMyRecipeExpand}
                                sx={{marginTop: '2em', marginBottom: '2em', bgcolor: "#F0B648"}}>
                            {myRecipeExpanded ? "Hide Recipes" : "Show Recipes"}
                        </Button>

                        <Button variant='contained' onClick={handleMyLikedExpand}
                                sx={{marginBottom: '2em', bgcolor: "#F09F48"}}>
                            {myLikedExpanded ? "Hide Liked" : "Show Liked"}
                        </Button>

                    </Box>

                    <Box sx={{display: 'flex', flexDirection: 'column', marginBottom: "10rem", flex: 1}}>

                        <Collapse in={myRecipeExpanded} timeout='auto' unmountOnExit>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                bgcolor: "#F2D6C7",
                                padding: "2rem",
                                borderTop: "8px solid #F06449",
                                borderLeft: "3px solid #F06449",
                                borderRight: "3px solid #F06449",
                                borderBottom: "8px solid #F06449",
                                borderRadius: "0.3rem",
                                marginLeft: "1.5rem",
                                marginBottom: '1.5rem'
                            }}>
                                <Typography variant='h2' sx={{
                                    marginBottom: "1.5rem",
                                    fontWeight: "bold", textDecoration: "underline",
                                    textDecorationColor: "#F0B648", textUnderlineOffset: "4px"
                                }}>
                                    {user.username}'s Recipes
                                </Typography>
                                <RecipeGrid colNum={3} recipes={filteredMyRecipes}/>
                            </Box>
                        </Collapse>


                        <Collapse in={myLikedExpanded} timeout='auto' unmountOnExit>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                bgcolor: "#F2D6C7",
                                padding: "2rem",
                                borderTop: "8px solid #F06449",
                                borderLeft: "3px solid #F06449",
                                borderRight: "3px solid #F06449",
                                borderBottom: "8px solid #F06449",
                                borderRadius: "0.3rem",
                                marginLeft: "1.5rem",
                                marginBottom: '1.5rem'
                            }}>
                                <Typography variant='h2' sx={{
                                    marginBottom: "1.5rem",
                                    fontWeight: "bold", textDecoration: "underline",
                                    textDecorationColor: "#F09F48", textUnderlineOffset: "4px"
                                }}>
                                    {user.username}'s Liked Recipes
                                </Typography>
                                <RecipeGrid colNum={3} recipes={likedRecipes}/>
                            </Box>
                        </Collapse>
                        {/*<BrowseFilterTags/>*/}
                    </Box>
                </Box>
            </div>
            </div>
        </div>
    );
}