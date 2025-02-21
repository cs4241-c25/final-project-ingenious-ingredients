import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function RecipeCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s"
                title="Delicious Cheeseburger"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Cheeseburger
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Cheeseburgers are delicious, and we think that you should make one too.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
