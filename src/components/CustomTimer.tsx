'use client'

import {
    Box,
    CircularProgress,
    styled,
} from "@material-ui/core";
import Button from "@mui/material/Button"
import {useEffect, useState} from 'react';
import {clearInterval, setInterval} from "worker-timers";
import MenuItem from "@mui/material/MenuItem";
import {TextField, Typography,} from "@mui/material";

//testing if works move to global once it works
const Container = styled(Box)({
    position: "relative",
    width: "450px",
    height: "600px",
    backgroundColor: "#F2D6C7",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "0.2rem",
    borderTop: "8px solid #F06449",
    borderLeft: "3px solid #F06449", borderRight: "3px solid #F06449", borderBottom: "8px solid #F06449",
    borderTopRightRadius: "0.3rem", borderBottomRightRadius: "0.3rem", borderBottomLeftRadius: "0.3rem"
});

const Root = styled(Box)({
    position: "relative",
    right: "6rem",
});

const Bottom = styled(CircularProgress)({
    color: "#b2b2b2",
    position: "absolute",
    zIndex: 0
});

const Top = styled(CircularProgress)({
    animationDuration: "100ms",
    position: "absolute",
    zIndex: 1
});

const Text = styled(Typography)({
    fontWeight: "bold",
    fontSize: "1.35em",
    marginTop: "1em"
});


const CustomTimer = (props) => {
    const {colors = [], colorValues =[]} = props;

    //Time
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [timeDuration, setTimeDuration] = useState(0);
    const [countdownText, setCountdownText] = useState("00:00:00");
    const [countdownPercent, setCountdownPercent] = useState(100);
    const [countdownColor, setCountdownColor] = useState("#004082");
    const [timerRunning, setTimerRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [label, setLabel] = useState<string>();


    const calculateTotalSeconds = () => hours * 3600 + minutes * 60 + seconds;

    const startTimer = () => {
        if (timerRunning) return;

        const duration = calculateTotalSeconds();

        if (duration > 0) {
            setTimeDuration(duration);
            setCountdownPercent(100); // Immediately animate to full circle
            setTimerRunning(true);

            const id = setInterval(() => {
                setTimeDuration((prev) => {
                    const newTimeDuration = prev - 1;
                    const percentage = Math.ceil((newTimeDuration / duration) * 100);
                    setCountdownPercent(percentage);

                    if (newTimeDuration <= 0) {
                        clearInterval(id);
                        setTimerRunning(false);
                        onComplete();
                        return 0;
                    }

                    return newTimeDuration;
                });
            }, 1000);

            setIntervalId(id);
        }
    };



    useEffect(() => {
        const h = Math.floor(timeDuration / 3600);
        const m = Math.floor((timeDuration % 3600) / 60);
        const s = timeDuration % 60;
        setCountdownText(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);

        for (let i = 0; i < colorValues.length; i++) {
            const item = colorValues[i];
            if(timeDuration === item){
                setCountdownColor(colors[i]);
                break;
            }
        }
    }, [timeDuration, colors, colorValues]);

    const togglePause = () => {
        if(timerRunning) {
            clearInterval(intervalId);
            setTimerRunning(false);
        } else {
            setTimerRunning(true);

            const id = setInterval(() => {
                setTimeDuration((prev) => {
                    const newTimeDuration = prev -1
                    const percentage = Math.ceil((newTimeDuration/calculateTotalSeconds()) * 100);
                    setCountdownPercent(percentage);

                    if (newTimeDuration <= 0){
                        clearInterval(id);
                        setTimerRunning(false);
                        onComplete();
                        return 0;
                    }

                    return newTimeDuration;
                });
            }, 1000);

            setIntervalId(id);
        }
    };

    function onComplete() {
        alert(`Your ${label} timer is done!`);
    }

    const handleOnEditLabel = (newLabel) => {
        setLabel(newLabel);
    }


    const generateOptions = (limit) =>
        Array.from({ length: limit }, (_, i) => (
            <MenuItem key={i} value={i}>
                {String(i).padStart(2, "0")}
            </MenuItem>
        ));

    return (
        <Box>
                <TextField value={label} label="Name your timer:" disabled={timerRunning} onBlur={(e) => handleOnEditLabel(e.target.value)}
                sx={{borderTop: "8px solid #F06449",
                    borderLeft: "3px solid #F06449", borderRight: "3px solid #F06449",
                    borderTopLeftRadiusRadius: "0.3rem", borderTopRightRadius: "0.3rem", bgcolor: "#F2D6C7"}}
                >Test
                </TextField>
            <Container>
                <Root>
                <Bottom variant="determinate" size={200} thickness={4} value={100} />
                <Top
                    variant="determinate"
                    size={200}
                    thickness={4}
                    value={countdownPercent}
                    style={{ color: countdownColor }}
                />
                </Root>
                <Box mt={2} sx={{display: 'flex', flexDirection: "column", alignContent: 'center', alignItems: "center"}}>
                    <Text sx={{margin: "1em", alignContent: 'center', alignItems: 'center'}}>{countdownText}</Text>
                    <Box sx={{marginBottom: "1em"}}>
                        <TextField
                            select
                            label="Hours"
                            value={hours}
                            onChange={(e) => {setHours(parseInt(e.target.value))}}
                            variant="outlined"
                            style={{ width: "5em" }}
                        >
                            {generateOptions(25)}
                        </TextField>

                        <TextField
                            select
                            label="Minutes"
                            value={minutes}
                            onChange={(e) => {setMinutes(parseInt(e.target.value))}}
                            variant="outlined"
                            style={{ width: "5em" }}
                        >
                            {generateOptions(61)}
                        </TextField>

                        <TextField
                            select
                            label="Seconds"
                            value={seconds}
                            onChange={(e) => {setSeconds(parseInt(e.target.value))}}
                            variant="outlined"
                            style={{ width: "5em" }}
                        >
                            {generateOptions(61)}
                        </TextField>
                    </Box>
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={startTimer}
                            disabled={timerRunning}
                        >
                            Start Timer
                        </Button>
                        <Button
                            variant="contained"
                            onClick={togglePause}
                            style={{ marginLeft: "1em", backgroundColor: "#F06449"}}
                        >
                            {!timerRunning ? "Resume" : "Pause"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default CustomTimer;

