import {Recipe} from "../../../Classes/Recipe";
import {Chip, TextField} from "@mui/material";
import DeleteRecipeButton from "@/components/DeleteRecipeButton";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {DeleteRecipe} from "@/Get-Post Requests/Recipe/deleteRecipe";
import SelectTags from "@/components/Create Recipe/SelectTags";
import Switch from "@mui/material/Switch";
import Form from "next/form";
import {RecipeIngredient} from "../../../Classes/RecipeIngredient";
import {RecipeStep} from "../../../Classes/Step";
import {PostRecipe} from "@/Get-Post Requests/Recipe/postRecipe";
import {ModifyRecipe} from "@/Get-Post Requests/Recipe/modifyRecipe";
import {Accordion} from "@mui/material";

interface EditRecipeContentProps {
    recipe: Recipe;
    onChange: () => void;
    onClose: (savedChanges: boolean) => void;
    onResetChanges: () => void;
}

export default function EditRecipeContent({ recipe, onChange, onClose, onResetChanges }: EditRecipeContentProps) {

    const [selectedTags, setSelectedTags] = useState<string[]>(recipe.tags);
    const [steps, setSteps] = useState<string[]>(recipe.steps.map(step => step.instruction));
    const [ingredients, setIngredients] = useState<string[]>(recipe.ingredients.map(ingredient => ingredient.name));
    const [newStep, setNewStep] = useState<string>("");
    const [newIngredient, setNewIngredient] = useState<string>("");

    const [formData, setFormData] = useState({
        name: recipe.name,
        prepTime: recipe.prepTime,
        mealType: recipe.mealType,
        tags: recipe.tags,
        image: recipe.image,
        likes: recipe.likes,
        slug: recipe.slug,
        isPublic: recipe.isPublic
    });

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            tags: selectedTags
        }));
        onChange();
    }, [selectedTags]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        onChange();
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
            const newPrepTime = value === "0" ? `${minutes ? minutes[1] : 0} minutes` : `${value} hours ${minutes ? minutes[1] : 0} minutes`;
            setFormData({ ...formData, prepTime: newPrepTime });
        } else if (name === "prepTimeMinutes") {
            const hours = formData.prepTime.match(/(\d+)\s*hours/);
            const newPrepTime = hours && hours[1] !== "0" ? `${hours[1]} hours ${value} minutes` : `${value} minutes`;
            setFormData({ ...formData, prepTime: newPrepTime });
        }
        onChange();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ingredientsArray = ingredients.map(ingredient => new RecipeIngredient(ingredient, 0, ''));
        const stepsArray = steps.map(step => new RecipeStep(step, []));

        const updatedRecipe = new Recipe(
            stepsArray,
            formData.name,
            recipe.creator,
            formData.isPublic,
            formData.prepTime,
            formData.mealType,
            formData.likes,
            recipe.postDate,
            ingredientsArray,
            selectedTags,
            recipe.slug,
            formData.image
        );

        const result = await ModifyRecipe(updatedRecipe, recipe.slug);
        onClose(true);
        window.location.reload();
    }

    const handleDiscard = (e) => {
        e.preventDefault();

        // Reset the form data to the initial recipe values
        setFormData({
            name: recipe.name,
            prepTime: recipe.prepTime,
            mealType: recipe.mealType,
            ingredients: recipe.ingredients.map(ingredient => `${ingredient.name}`).join(', '),
            tags: recipe.tags,
            image: recipe.image,
            likes: recipe.likes,
            slug: recipe.slug,
            isPublic: recipe.isPublic
        });
        setSteps(recipe.steps.map(step => step.instruction));

        onResetChanges();
        onClose(false);
    }

    const handleDeleteButton = () => {
        if (confirm("Are you sure you want to delete this recipe?")) {

            // TODO: Unlike recipe

            DeleteRecipe(recipe.slug).then(() => {
                window.location.href = '/recipes';
            });
        }
    };

    return (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px'}}>
            <div>
                <p>Recipe Title</p>
                <TextField name="name" onChange={handleChange} value={formData.name} fullWidth/><br/>
                <p>Prep Time</p>
                <TextField name="prepTimeHours" onChange={handlePrepTimeChange} value={formData.prepTime.match(/(\d+)\s*hours/)?.[1] || '0'}/> Hours
                <TextField name="prepTimeMinutes" onChange={handlePrepTimeChange} value={formData.prepTime.match(/(\d+)\s*minutes/)?.[1] || '0'}/> Minutes<br/>
                {/*TODO: (above) prep time will be stored as # hours # minutes. Will need to address this later on.*/}
                <p>Select Tags for your Recipe</p>
                <SelectTags onTagsChange={setSelectedTags} defaultTags={recipe.tags}/><br/>
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
                <p>Image URL</p>
                <TextField id="image" name="image" variant="outlined" onChange={handleChange} value={formData.image}
                           fullWidth/>
                <p>Public</p>
                <Switch name="isPublic" onChange={handleChange} checked={formData.isPublic}/>
            </div>
            <div style={{gridColumn: 'span 2', textAlign: 'center'}}>
                <Button onClick={handleSubmit}>
                    Save Changes
                </Button>
                <Button onClick={handleDiscard}>
                    Discard Changes
                </Button>
                <Button onClick={handleDeleteButton}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete Recipe
                </Button>
            </div>
        </div>
    );
}