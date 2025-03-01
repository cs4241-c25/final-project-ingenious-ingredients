"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { redirect } from 'next/navigation'
import CustAvatar from "@/components/CustAvatar";
import NavAvatar from "@/components/NavAvatar";
import {signOut, useSession} from "next-auth/react";


const settings = ['Your Page', 'Your Recipes', 'Your Pantry', 'Your Meal Plan', 'Logout'];


function SignInDD() {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toPantry = (event: React.MouseEvent<HTMLElement>) => {
        redirect("/my-pantry");
    };

    const toAuthor = (event: React.MouseEvent<HTMLElement>) => {
        redirect("/author");
    };

    const toMealPlan = (event: React.MouseEvent<HTMLElement>) => {
        redirect("/my-meal-plan");
    };

    const toMyRecipes = (event: React.MouseEvent<HTMLElement>) => {
        redirect("/my-recipes");
    };
    const logOut = (event: React.MouseEvent<HTMLElement>) => {
        signOut({callbackUrl: '/hero'});
    };

    const signIn = (event: React.MouseEvent<HTMLElement>) => {
        redirect("/api/auth/signin");
    };


    const {data: session} = useSession();

    if(!session){
        return (
            <MenuItem onClick={signIn}>
                <Typography sx={{textAlign: 'center'}}>Sign In</Typography>
            </MenuItem>
        )
    }
    else {
        return (
            <Box sx={{flexGrow: 0}}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <NavAvatar userName={session?.user?.name} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={toAuthor}>
                        <Typography sx={{textAlign: 'center'}}>Your Page</Typography>
                    </MenuItem>
                    <MenuItem onClick={toMyRecipes}>
                        <Typography sx={{textAlign: 'center'}}>Your Recipes</Typography>
                    </MenuItem>
                    <MenuItem onClick={toPantry}>
                        <Typography sx={{textAlign: 'center'}}>Your Pantry</Typography>
                    </MenuItem>
                    <MenuItem onClick={toMealPlan}>
                        <Typography sx={{textAlign: 'center'}}>Your Meal Plan</Typography>
                    </MenuItem>
                    <MenuItem onClick={logOut}>
                        <Typography sx={{textAlign: 'center'}}>Logout</Typography>
                    </MenuItem>

                    {/*{settings.map((setting) => (*/}
                    {/*    <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                    {/*        <Typography sx={{textAlign: 'center'}}>Test</Typography>*/}
                    {/*    </MenuItem>*/}
                    {/*))}*/}
                </Menu>
            </Box>
        );
    }
}
export default SignInDD;