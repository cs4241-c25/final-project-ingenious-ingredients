import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import '../app/globals.css';
import {Chip} from "@mui/material";

// TODO: image currently does not exist as a variable of class Recipe
// TODO: tags should be chip components eventually
// TODO: link needs to bring you to the appropriate recipe slug
export default function RecipeCard({ name, creator, prepTime, image, likes, postDate, ingredients, tags }) {

    function getFirstThreeIngredients() {
        let firstThreeIngredients = '';
        for (let i = 0; i < 3; i++) {
            firstThreeIngredients += ingredients[i];
            if (i !== 2) {
                firstThreeIngredients += ", ";
            }
        }
        firstThreeIngredients += "...";
        return firstThreeIngredients;
    }

    function stylizedTags() {
        return tags.map((tag, index) => (
            <Chip key={index} label={tag} sx={{ margin: '2px' }} />
        ));
    }

    return (
        <a href="https://example.com" className="recipe-card-link">
            <Card variant="outlined" sx={{width: 320}} size="lg">
                <CardOverflow>
                    <AspectRatio ratio="2">
                        <img
                            srcSet={image}
                            loading="lazy"
                            alt={name}
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography level="title-lg">{name}</Typography>
                    <Typography level="body-md">By: {creator}</Typography>
                    <Typography level="body-sm">Ingredients: {getFirstThreeIngredients()}</Typography>
                    <CardOverflow variant="soft" sx={{bgcolor: 'background.level1'}}>
                        <Divider inset="context"/>
                        <CardContent orientation="horizontal">
                            <Typography
                                level="body-xs"
                                textColor="text.secondary"
                                sx={{fontWeight: 'md'}}
                            >
                                {likes} likes
                            </Typography>
                            <Divider orientation="vertical"/>
                            <Typography
                                level="body-xs"
                                textColor="text.secondary"
                                sx={{fontWeight: 'md'}}
                            >
                                {postDate}
                            </Typography>
                            <Divider orientation="vertical"/>
                            <Typography
                                level="body-xs"
                                textColor="text.secondary"
                                sx={{fontWeight: 'md'}}
                            >
                                Takes {prepTime}
                            </Typography>
                        </CardContent>
                    </CardOverflow>
                    <Typography level="body-sm">Tags: {stylizedTags()}</Typography>
                </CardContent>
            </Card>
        </a>
);
}