import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import '../app/globals.css';

export default function RecipeCard() {
    return (
        <a href="https://example.com" className="recipe-card-link">
            <Card variant="outlined" sx={{width: 320}} size="lg">
                <CardOverflow>
                    <AspectRatio ratio="2">
                        <img
                            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography level="title-md">Yosemite National Park</Typography>
                    <Typography level="body-sm">California</Typography>
                    <CardOverflow variant="soft" sx={{bgcolor: 'background.level1'}}>
                        <Divider inset="context"/>
                        <CardContent orientation="horizontal">
                            <Typography
                                level="body-xs"
                                textColor="text.secondary"
                                sx={{fontWeight: 'md'}}
                            >
                                6.3k views
                            </Typography>
                            <Divider orientation="vertical"/>
                            <Typography
                                level="body-xs"
                                textColor="text.secondary"
                                sx={{fontWeight: 'md'}}
                            >
                                1 hour ago
                            </Typography>
                        </CardContent>
                    </CardOverflow>
                </CardContent>
            </Card>
        </a>
);
}