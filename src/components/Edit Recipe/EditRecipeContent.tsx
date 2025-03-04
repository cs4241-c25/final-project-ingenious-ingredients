import {Recipe} from "../../../Classes/Recipe";
import {TextField} from "@mui/material";

interface EditRecipeContentProps {
    recipe: Recipe;
}

export default function EditRecipeContent({ recipe }: EditRecipeContentProps) {

    // if recipe is unchanged - no props are different, then if you click away from the modal it will let you without having a confirmation.

    return (
        <TextField/>
    );
}