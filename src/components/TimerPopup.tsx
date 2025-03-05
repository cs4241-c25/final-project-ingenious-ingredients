'use client'

import React from 'react';
import CustomTimer from './CustomTimer';
import {Button, CssBaseline} from "@mui/material";
import {createRoot} from 'react-dom/client';


import {
    Box,
    CircularProgress,
    styled,
    Typography
} from "@material-ui/core";

const TimerPopup = () => {
    const openTimerWindow = () => {
        const timerWindow = window.open(
            "",
            "",
            "width=450,height=450,resizable=0"
        );

        if (timerWindow) {
            timerWindow.document.write(`
        <html lang="en">
          <head>
            <title>Timer</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="global.css">
            <style>
              body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                font-family: 'Roboto', sans-serif;
                background-color: #f4f4f4;
              }
            </style>
          </head>
          <body>
            <div id="timer-root"></div>
          </body>
        </html>
      `);

            timerWindow.document.close();

            timerWindow.onload = async () => {
                const timerRoot = timerWindow.document.getElementById("timer-root");
                if (timerRoot) {
                    const root = createRoot(timerRoot);
                    root.render(
                        <>
                            <CustomTimer
                                colors={['#FF0000', '#00FF00']}
                                colorValues={[30, 60]}
                                onComplete={() => {
                                    console.log('Timer Completed');
                                }}
                            />
                        </>
                    );
                }
            };
        }
    };

    return (
        <>
            <Button variant="contained" onClick={openTimerWindow}>
                Start Timer
            </Button>
        </>
    );
};

export default TimerPopup;