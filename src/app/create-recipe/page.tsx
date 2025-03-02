"use client";

import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import NavBar from "../../components/NavBar";
import { PostRecipe } from "@/Get-Post Requests/Recipe/postRecipe";
import { TextField } from "@mui/material";
import InputIngredient from "@/components/Create Recipe/InputIngredient";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {Recipe} from "../../../Classes/Recipe";
import {RecipeIngredient} from "../../../Classes/RecipeIngredient";
import {RecipeStep} from "../../../Classes/Step";
import {ToggleButtonGroup} from "@mui/material";
import {ToggleButton} from "@mui/material";
import {useSession} from "next-auth/react";
import {User} from "../../../Classes/User";
import {GetUser} from "@/Get-Post Requests/User/getUser";

type Step = {
    instruction: string;
    ingredients: { name: string; amount: number; unitOfMeasure: string }[];
};

const steps = ['Recipe Details', 'Ingredients and Steps', 'Review & Submit'];

export default function CreateRecipe() {

    const {data: session} = useSession();
    const [user, setUser] = React.useState<User>(null);

    React.useEffect(() => {
        async function fetchUser() {
            const user = await GetUser(session?.user?.name);
            setUser(user);
        }
        fetchUser();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        prepTime: '',
        mealType: '',
        ingredients: '',
        tags: '',
        steps: '',
        image: '',
        likes: 2,
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
            ...formData, // Spread the existing formData
            [name]: type === 'checkbox' ? checked : value // Update the changed field
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
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
        <div>
            <NavBar stickOrNah={"sticky"} />
            <h1>Create Recipe</h1>
            <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {allStepsCompleted() ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                Step {activeStep + 1}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext} sx={{ mr: 1 }}>
                                    Next
                                </Button>
                                {activeStep !== steps.length &&
                                    (completed[activeStep] ? (
                                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                            Step {activeStep + 1} already completed
                                        </Typography>
                                    ) : (
                                        <Button onClick={handleComplete}>
                                            {completedSteps() === totalSteps() - 1
                                                ? 'Finish'
                                                : 'Complete Step'}
                                        </Button>
                                    ))}
                            </Box>
                        </React.Fragment>
                    )}
                </div>
            </Box>
            <form onSubmit={handleSubmit}>
                {activeStep === 0 && (
                    <div>
                        <TextField id="name" label="Recipe Title" name="name" variant="outlined" onChange={handleChange} required />
                        <br />
                        <TextField id="prepTime" label="Prep Time" name="prepTime" variant="outlined" onChange={handleChange} required />
                        <ToggleButtonGroup
                            value={time}
                            exclusive
                            onChange={handleTime}
                            aria-label="text alignment"
                        >
                            <ToggleButton value="minutes" aria-label="left aligned">
                                Minutes
                            </ToggleButton>
                            <ToggleButton value="hours" aria-label="centered">
                                Hours
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <br />
                        <TextField id="mealType" label="Meal Type" name="mealType" variant="outlined" onChange={handleChange} required />
                        <br />
                        <TextField id="tags" label="Tags" name="tags" variant="outlined" onChange={handleChange} required />
                        <br />
                        <TextField id="steps" label="Steps" name="steps" variant="outlined" onChange={handleChange} required />
                        <br />
                        <TextField id="image" label="Image URL" name="image" variant="outlined" onChange={handleChange} required />
                        <br />
                        <label htmlFor="isPublic">Share Recipe?</label>
                        <Switch name="isPublic" onChange={handleChange} />
                    </div>
                )}
                {activeStep === 1 && <InputIngredient />}
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
        </div>
    );
}