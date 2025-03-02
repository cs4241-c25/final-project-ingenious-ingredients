import React from 'react';
import {Box, Typography} from "@mui/material";

const ImageParallax = () => {
    return (
        <Box sx={{position: 'relative', width:"100%", height:'375px', overflow:'hidden'}}>
                <Box
                    sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '24rem',
                            backgroundImage: `url('https://images.unsplash.com/photo-1488992783499-418eb1f62d08?q=80&w=3389&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                            backgroundSize: 'cover',
                            backgroundAttachment: 'fixed',
                            backgroundPosition: 'center',
                    }}
                />

                <Box
                    sx={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100%', backgroundColor: 'black',
                    opacity: 0.75, justifyContent: 'center', alignContent: 'center'}}
                 >
                    <div className="text-center">
                            <h1 className="text-8xl font-bold mb-4 border-4 text-white">TAKE CONTROL OF YOUR KITCHEN</h1>
                            <p className="text-4xl font-bold text-white">Let Them Cook!</p>
                    </div>
            </Box>
        </Box>
    )
}

export default ImageParallax;