"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SignInDD from "@/components/SignInDD";
import {Recipe} from "../../Classes/Recipe";
import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";

const pages = ['Browse Recipes'];


// type stickOrNot = {
//     navType: string
// }


interface NavBarProps {
    stickOrNah: string
}


    // function NavBar(props: stickOrNot) {
const NavBar: React.FC<NavBarProps> = ({stickOrNah}) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        redirect("/recipes");
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toRecipes = (event: React.MouseEvent<HTMLElement>) => {
        redirect("/recipes");
    };

    const toTimer = (event: React.MouseEvent<HTMLElement>) => {
        redirect("/timer");
    };

    const toCreateRecipes = (event: React.MouseEvent<HTMLElement>) => {
        redirect("/create-recipe");
    };

    const {data: session} = useSession();

    if(!session){
        return (
            <nav id="mainBar" >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/*Below is the Icon for the Website (Commented Out*/}
                        {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/hero"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {/*The Title on the left*/}
                            LTC
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{display: {xs: 'block', md: 'none'}}}
                            >
                                <MenuItem onClick={toRecipes}>
                                    <Typography sx={{textAlign: 'center'}}>Browse Recipes</Typography>
                                </MenuItem>
                                <MenuItem onClick={toTimer}>
                                    <Typography sx={{textAlign: 'center'}}>Timer</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        {/*<AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>*/}
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <MenuItem onClick={toRecipes}>
                                <Typography sx={{textAlign: 'center'}}>Browse Recipes</Typography>
                            </MenuItem>
                            <MenuItem onClick={toTimer}>
                                <Typography sx={{textAlign: 'center'}}>Timer</Typography>
                            </MenuItem>
                        </Box>
                        <SignInDD/>
                    </Toolbar>
                </Container>
            </nav>
        );


    }
    else {
        return (
            <nav id="mainBar" >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/*Below is the Icon for the Website (Commented Out*/}
                        {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/hero"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {/*The Title on the left*/}
                            LTC
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{display: {xs: 'block', md: 'none'}}}
                            >
                                <MenuItem onClick={toRecipes}>
                                    <Typography sx={{textAlign: 'center'}}>Browse Recipes</Typography>
                                </MenuItem>
                                <MenuItem onClick={toCreateRecipes}>
                                    <Typography sx={{textAlign: 'center'}}>Create Recipes</Typography>
                                </MenuItem>
                                <MenuItem onClick={toTimer}>
                                    <Typography sx={{textAlign: 'center'}}>Timer</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        {/*<AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>*/}
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <MenuItem onClick={toRecipes}>
                                <Typography sx={{textAlign: 'center'}}>Browse Recipes</Typography>
                            </MenuItem>
                            <MenuItem onClick={toCreateRecipes}>
                                <Typography sx={{textAlign: 'center'}}>Create Recipes</Typography>
                            </MenuItem>
                            <MenuItem onClick={toTimer}>
                                <Typography sx={{textAlign: 'center'}}>Timer</Typography>
                            </MenuItem>
                        </Box>
                        <SignInDD/>
                    </Toolbar>
                </Container>
            </nav>
        );

    }

}
export default NavBar;