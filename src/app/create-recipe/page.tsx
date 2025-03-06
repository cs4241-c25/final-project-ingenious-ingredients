"use client";

import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import NavBar from "../../components/NavBar";
import { PostRecipe } from "@/Get-Post Requests/Recipe/postRecipe";
import { TextField, Button, Typography, Box, Chip } from "@mui/material";
import { Recipe } from "../../../Classes/Recipe";
import { RecipeIngredient } from "../../../Classes/RecipeIngredient";
import { RecipeStep } from "../../../Classes/Step";
import { useSession } from "next-auth/react";
import { User } from "../../../Classes/User";
import { GetUser } from "@/Get-Post Requests/User/getUser";
import SelectTags from "@/components/Create Recipe/SelectTags";

export default function CreateRecipe() {
    const { data: session } = useSession();
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        async function fetchUser() {
            const user = await GetUser(session?.user?.name);
            setUser(user);
        }
        fetchUser();
    }, [session]);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [newStep, setNewStep] = useState<string>("");
    const [newIngredient, setNewIngredient] = useState<string>("");

    const [formData, setFormData] = useState({
        name: '',
        prepTime: '',
        mealType: '',
        tags: selectedTags,
        image: '',
        likes: 0,
        slug: "",
        isPublic: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleStepChange = (e) => {
        setNewStep(e.target.value);
    };

    const handleAddStep = () => {
        if (newStep.trim() !== "") {
            setSteps([...steps, newStep.trim()]);
            setNewStep("");
        }
    };

    const handleDeleteStep = (stepToDelete) => {
        setSteps(steps.filter(step => step !== stepToDelete));
    };

    const handleIngredientChange = (e) => {
        setNewIngredient(e.target.value);
    };

    const handleAddIngredient = () => {
        if (newIngredient.trim() !== "") {
            setIngredients([...ingredients, newIngredient.trim()]);
            setNewIngredient("");
        }
    };

    const handleDeleteIngredient = (ingredientToDelete) => {
        setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToDelete));
    };

    const handlePrepTimeChange = (e) => {
        const { name, value } = e.target;
        if (name === "prepTimeHours") {
            const minutes = formData.prepTime.match(/(\d+)\s*minutes/);
            const newPrepTime = !value || value === "0" ? `${minutes ? minutes[1] : 0} minutes` : `${value} hours ${minutes ? minutes[1] : 0} minutes`;
            setFormData({ ...formData, prepTime: newPrepTime });
        } else if (name === "prepTimeMinutes") {
            const hours = formData.prepTime.match(/(\d+)\s*hours/);
            const newPrepTime = hours && hours[1] !== "0" ? `${hours[1]} hours ${value} minutes` : `${value} minutes`;
            setFormData({ ...formData, prepTime: newPrepTime });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ingredientsArray = ingredients.map(ingredient => new RecipeIngredient(ingredient, '', ''));
        const stepsArray = steps.map(step => new RecipeStep(step, []));

        const recipe = new Recipe(
            stepsArray,
            formData.name,
            user.username,
            formData.isPublic,
            formData.prepTime,
            formData.mealType,
            formData.likes,
            new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
            ingredientsArray,
            selectedTags,
            formData.slug,
            formData.image,
        );

        const result = await PostRecipe(recipe);

        window.location.href = '/recipes';
    };

    return (
        <div style={{backgroundImage: "url('/emoji-grid-2.svg')"}}>
            <NavBar stickOrNah={"sticky"}/>
            <div id="page-background"
                 style={{
                     marginLeft: "20%",
                     marginRight: "20%",
                     marginBottom: "2%",
                     justifyContent: "flex-start",
                     gap: "3rem",
                     display: "flex",
                     backgroundColor: "#fff0",
                 }}>
                <Box id="main-browse-content" sx={{
                    display: "flex", flexDirection: "column",
                    bgcolor: "#F2D6C7", padding: "2rem", borderTop: "8px solid #F06449",
                    borderLeft: "3px solid #F06449", borderRight: "3px solid #F06449", borderBottom: "8px solid #F06449",
                    borderRadius: "0.3rem"
                }}>
                    <Typography variant='h2' sx={{marginBottom: "1.5rem",
                        fontWeight: "bold", textDecoration:"underline",
                        textDecorationColor: "#F08148", textUnderlineOffset: "4px"
                    }}>
                        Create Recipe
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p>Recipe Title</p>
                            <TextField fullWidth id="name" label="Recipe Title" name="name" variant="outlined" onChange={handleChange}
                                       required/>
                            <br/><br/>
                            <div>
                                <p>Prep Time</p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        id="prepTimeHours"
                                        type="number"
                                        name="prepTimeHours"
                                        defaultValue={0}
                                        onChange={handlePrepTimeChange}
                                    />
                                    <p style={{ margin: '0 10px' }}>Hours</p>
                                    <TextField
                                        id="prepTimeMinutes"
                                        type="number"
                                        name="prepTimeMinutes"
                                        defaultValue={0}
                                        onChange={handlePrepTimeChange}
                                    />
                                    <p style={{ margin: '0 10px' }}>Minutes</p>
                                </div>
                            </div>
                            <br/>
                            <p>Select Tags for your Recipe</p>
                            <SelectTags onTagsChange={setSelectedTags}/>
                            <br/>
                            <p>Paste a link to an image URL to use for your recipe</p>
                            <TextField id="image" label="Image URL" name="image" variant="outlined" onChange={handleChange}/>
                            <br/><br/>
                            <label htmlFor="isPublic">Would you like this recipe to be public?</label>
                            <Switch name="isPublic" onChange={handleChange}/>
                        </div>
                        <div>
                            <p>Recipe Steps</p>
                            <TextField name="newStep" onChange={handleStepChange} value={newStep}
                                       placeholder="Type a step and press Add" fullWidth/><br/>
                            <Button onClick={handleAddStep}>Add Step</Button>
                            <div>
                                {steps.map((step, index) => (
                                    <div key={index} style={{marginBottom: '8px', whiteSpace: 'pre-line'}}>
                                        <span style={{marginRight: '8px'}}>{index + 1}.</span>
                                        <Chip
                                            sx={{
                                                height: 'auto',
                                                marginLeft: '8px',
                                                '& .MuiChip-label': {
                                                    display: 'block',
                                                    whiteSpace: 'normal',
                                                },
                                            }}
                                            label={step}
                                            onDelete={() => handleDeleteStep(step)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p>Recipe Ingredients</p>
                            <TextField name="newIngredient" onChange={handleIngredientChange} value={newIngredient}
                                       placeholder="Type an ingredient and press Add" fullWidth/><br/>
                            <Button onClick={handleAddIngredient}>Add Ingredient</Button>
                            <div>
                                {ingredients.map((ingredient, index) => (
                                    <div key={index} style={{marginBottom: '8px', whiteSpace: 'pre-line'}}>
                                        <Chip
                                            sx={{
                                                height: 'auto',
                                                marginLeft: '8px',
                                                '& .MuiChip-label': {
                                                    display: 'block',
                                                    whiteSpace: 'normal',
                                                },
                                            }}
                                            label={ingredient}
                                            onDelete={() => handleDeleteIngredient(ingredient)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button type="submit" variant="contained" color="primary">
                            Submit Recipe
                        </Button>
                    </form>
                </Box>
            </div>
        </div>
    );
}