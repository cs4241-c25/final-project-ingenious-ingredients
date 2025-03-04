"use client";

import React from 'react';
import {useSession} from "next-auth/react";
import {User} from "../../../Classes/User";
import {GetUser} from "@/Get-Post Requests/User/getUser";
import {Recipe} from "../../../Classes/Recipe";
import { useState } from 'react';
import { Modal, Box } from '@mui/material';
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import EditRecipeContent from "@/components/Edit Recipe/EditRecipeContent";

interface EditRecipeButtonProps {
    recipe: Recipe;
}

export default function EditRecipeButton({ recipe }: EditRecipeButtonProps) {

    const {data: session} = useSession();
    const [user, setUser] = React.useState<User>(null);
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        async function fetchUser() {
            const user = await GetUser(session?.user?.name);
            setUser(user);
        }
        fetchUser();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if (confirm("Are you sure you want to discard your changes?")) {
            setOpen(false);
        }
    };


    if (!user || user.username !== recipe.creator) {
        return <></>;
    }

    return (
        <div>
            <Button onClick={handleOpen} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Edit Recipe
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography variant="h6" component="h2">
                        Edit Recipe
                    </Typography>
                    <Typography sx={{mt: 2}}>
                    </Typography>
                    <EditRecipeContent recipe={recipe}/>
                </Box>
            </Modal>
        </div>
    );
}