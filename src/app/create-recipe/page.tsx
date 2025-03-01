"use client";

import React, {useState} from 'react';
import Switch from '@mui/material/Switch';
import NavBar from "../../components/NavBar";
import {PostRecipe} from "@/Get-Post Requests/Recipe/postRecipe";

import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {TextField} from "@mui/material";
import InputIngredient from "@/components/InputIngredient";

export default function CreateRecipe() {

    const [formData, setFormData] = useState({
        name: '',
        creator: '', // get this from the user's session
        prepTime: '',
        postDate: new Date(),
        mealType: '',
        ingredients: '',
        tags: '',
        steps: '',
        image: '',
        isPublic: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ingredientsArray = formData.ingredients.split(',').map(ingredient => {
            const [name, amount, unitOfMeasure] = ingredient.trim().split(' ');
            return { name, amount, unitOfMeasure };
        });
        const stepsArray = formData.steps.split('.').map(step => ({ instruction: step.trim() }));
        const recipe = {
            ...formData,
            ingredients: ingredientsArray,
            steps: stepsArray
        };
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
            <NavBar stickOrNah={"sticky"}/>
            <h1>Create Recipe</h1>
            <form>
                <TextField id="outlined-basic" label="Name" variant="outlined" />
                <br/>
                <TextField id="outlined-basic" label="Time" variant="outlined" />
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
                <br/>
                <InputIngredient/>
                <br/>
                <label htmlFor="tags">Tags:</label>
                <input type="text" id="tags" name="tags" required/>
                <br/>
                <label htmlFor="steps">Steps:</label>
                <input type="text" id="steps" name="steps" required/>
                <br/>
                <label htmlFor="image">Image:</label>
                <input type="text" id="image" name="image" required/>
                <br/>
                <label htmlFor="isPublic">Share Recipe?</label>
                <Switch/>
                <br/>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}