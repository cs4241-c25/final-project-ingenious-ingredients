import {Recipe} from "../../../Classes/Recipe";
import {TextField} from "@mui/material";
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

interface EditRecipeContentProps {
    recipe: Recipe;
    onChange: () => void;
    onClose: (savedChanges: boolean) => void;
    onResetChanges: () => void;
}

export default function EditRecipeContent({ recipe, onChange, onClose, onResetChanges }: EditRecipeContentProps) {

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        name: recipe.name,
        prepTime: recipe.prepTime,
        mealType: recipe.mealType,
        ingredients: recipe.ingredients.map(ingredient => `${ingredient.name}`).join(', '),
        tags: selectedTags,
        steps: recipe.steps.map(step => step.instruction).join('. '),
        image: recipe.image,
        likes: recipe.likes,
        slug: recipe.slug,
        isPublic: recipe.isPublic
    });

    useEffect(() => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ingredientsArray = formData.ingredients.split(',').map(ingredient => {
            const [name] = ingredient.trim().split(' ');
            return new RecipeIngredient(name, 0, '');
        });

        const stepsArray = formData.steps.split('.').map(step => new RecipeStep(
            step.trim(),
            [] // Add an empty ingredients array or populate it as needed
        ));

        const updatedRecipe = new Recipe(
            stepsArray,
            formData.name,
            recipe.creator,
            formData.isPublic,
            Number(formData.prepTime),
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
    }

    const handleDiscard = (e) => {
        e.preventDefault();

        // Reset the form data to the initial recipe values
        setFormData({
            name: recipe.name,
            prepTime: recipe.prepTime,
            mealType: recipe.mealType,
            ingredients: recipe.ingredients.map(ingredient => `${ingredient.name}`).join(', '),
            tags: selectedTags,
            steps: recipe.steps.map(step => step.instruction).join('. '),
            image: recipe.image,
            likes: recipe.likes,
            slug: recipe.slug,
            isPublic: recipe.isPublic
        });

        onResetChanges();
        onClose(false);
    }

    const handleDeleteButton = () => {
        if (confirm("Are you sure you want to delete this recipe?")) {
            DeleteRecipe(recipe.slug).then(() => {
                window.location.href = '/recipes';
            });
        }
    };

    return (
        <>
            <p>Recipe Title</p>
            <TextField name="name" onChange={handleChange} value={formData.name}/><br/>
            <p>Prep Time</p>
            <TextField name="prepTime" onChange={handleChange} value={formData.prepTime}/><br/>
            {/*TODO: (above) prep time will be stored as # hours # minutes. Will need to address this later on.*/}
            <p>Select Tags for your Recipe</p>
            <SelectTags onTagsChange={setSelectedTags} defaultTags={recipe.tags}/><br/>
            {/*TODO: ^^ default should be recipe.tags*/}
            <p>Image URL</p>
            <TextField id="image" name="image" variant="outlined" onChange={handleChange} value={formData.image}/>
            <p>Public</p>
            <Switch name="isPublic" onChange={handleChange} checked={formData.isPublic}/>
            <div>
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
        </>
    );
}