"use client";

import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import NavBar from "../../components/NavBar";
import { PostRecipe } from "@/Get-Post Requests/Recipe/postRecipe";
import { TextField } from "@mui/material";
import InputIngredient from "@/components/Create Recipe/InputIngredient";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { Recipe } from "../../../Classes/Recipe";
import { RecipeIngredient } from "../../../Classes/RecipeIngredient";
import { RecipeStep } from "../../../Classes/Step";
import { ToggleButtonGroup } from "@mui/material";
import { ToggleButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { User } from "../../../Classes/User";
import { GetUser } from "@/Get-Post Requests/User/getUser";
import SelectTags from "@/components/Create Recipe/SelectTags";
import RecipeStepper from "@/components/Create Recipe/RecipeStepper";
import {Box} from "@material-ui/core";
import BrowseFilterTags from "@/components/Display Recipe/BrowseFilterTags";
import RecipeGrid from "@/components/Display Recipe/RecipeGrid";

const steps = ['Recipe Details', 'Ingredients and Steps', 'Review & Submit'];

// TODO: A user must be signed in to access this page. If they are not, show a message saying they must sign in with the button.
export default function CreateRecipe() {
    const { data: session } = useSession();
    const [user, setUser] = React.useState<User>(null);

    React.useEffect(() => {
        async function fetchUser() {
            const user = await GetUser(session?.user?.name);
            setUser(user);
        }
        fetchUser();
    }, []);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        prepTime: '',
        mealType: '',
        ingredients: '',
        tags: selectedTags,
        steps: '',
        image: '',
        likes: 0,
        slug: "",
        isPublic: false
    });

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep = isLastStep() && !allStepsCompleted()
            ? steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({ ...completed, [activeStep]: true });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        // Prevent the form from refreshing the page
        e.preventDefault();

        // Check if required fields are filled
        const missingFields = [];
        if (!formData.name) missingFields.push('name');
        if (!formData.prepTime) missingFields.push('prep time');
        if (selectedTags.length === 0) missingFields.push('tags');
        if (!formData.steps) missingFields.push('steps');

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(', ')}.`);
            return;
        }

        const ingredientsArray = formData.ingredients.split(',').map(ingredient => {
            const [name, amount, unitOfMeasure] = ingredient.trim().split(' ');
            return new RecipeIngredient(name, Number(amount), unitOfMeasure);
        });

        const stepsArray = formData.steps.split('.').map(step => new RecipeStep(
            step.trim(),
            [] // Add an empty ingredients array or populate it as needed
        ));

        const recipe = new Recipe (
            stepsArray, // Ensure steps is an array of RecipeStep objects
            formData.name,
            user.username,
            formData.isPublic,
            Number(formData.prepTime),
            formData.mealType,
            formData.likes,
            new Date().toISOString().split('T')[0],
            ingredientsArray,
            selectedTags,
            formData.slug,
            formData.image,
        );
        const result = await PostRecipe(recipe);
        console.log(result);
    };

    const [time, setTime] = React.useState<string | null>('left');
    const handleTime = (
        event: React.MouseEvent<HTMLElement>,
        newTime: string | null,
    ) => {
        setTime(newTime);
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
            {activeStep === 0 && (
                <div>
                    <p>Recipe Title</p>
                    <TextField fullWidth id="name" label="Recipe Title" name="name" variant="outlined" onChange={handleChange}
                               required/>
                    <br/><br/>
                    <div>
                        <p>Prep Time</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                id="outlined-number"
                                type="number"
                                name="prepTime"
                                defaultValue={0}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={handleChange}
                            />
                            <p style={{ margin: '0 10px' }}>Hours</p>
                            <TextField
                                id="outlined-number"
                                type="number"
                                defaultValue={0}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
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
            )}
            {activeStep === 1 && (
                <div>
                    <InputIngredient/>
                    <TextField id="steps" label="Steps" name="steps" variant="outlined" onChange={handleChange} required />
                    </div>
                )}
                {activeStep === 2 && (
                    <div>
                        <Typography variant="h6">Review your recipe</Typography>
                        <pre>{JSON.stringify(formData, null, 2)}</pre>
                        <Button type="submit" variant="contained" color="primary">
                            Submit Recipe
                        </Button>
                    </div>
                )}
            </form>
            <RecipeStepper
                activeStep={activeStep}
                completed={completed}
                handleStep={handleStep}
                handleNext={handleNext}
                handleBack={handleBack}
                handleComplete={handleComplete}
                handleReset={handleReset}
            />
        </Box>
        </div>
        </div>
    );
}