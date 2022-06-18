
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimerWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    height: 100vh;
    width: 100vw;
    background-color: #f1f1f1;
    color: #1b1b1b;
    h1, p {
        width: 50%;
        margin-inline: auto;
        font-size: 2rem;
    }
    button {
    }
    .act-name {
        font-size: 1.5rem;
        text-align: center;
    }
    .timer {
        display: flex;
        justify-content: center;
        height: 100%;
    }
    .time {
        display: flex;
        flex-direction: column;
        height: 50%;
        justify-content: center;
        align-items: center;
    }
    .timer-complete-msg {
        font-size: 3rem;
        width: 100%;
        text-align: center;
    }
`;

const Timer = ( {activity, showTimer, setShowTimer, hrGoal, minGoal, secGoal, hrLeft, minLeft, secLeft, hrLeftSetter, minLeftSetter, secLeftSetter} ) => {
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);
    const [timerActive, setTimerActive] = useState(false);
    const [timerDone, setTimerDone] = useState(false);

    const startPauseHandler = () => {
        if (timerActive) {
            setTimerActive(!timerActive); //set false
        }
        if (!timerActive) {
            setTimerActive(!timerActive); //set true
        }
    };
    const resetTimerHandler = () => {
        setHours(hrGoal);
        setMinutes(minGoal);
        setSeconds(secGoal);
    };

    useEffect( () => {
        if (hours === null) {
            setHours(hrLeft);
        }
        if (minutes === null) {
            setMinutes(minLeft);
        }
        if (seconds === null) {
            setSeconds(secLeft);
        }
        if (hours !== null) {
            hrLeftSetter(hours);
        }
        if (minutes !== null) {
            minLeftSetter(minutes);
        }
        if (seconds !== null) {
            secLeftSetter(seconds);
        }
    }, [hours, minutes, seconds]);

    useEffect( () => {
        const timer = setTimeout( () => {
            if (timerActive) {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (seconds === 0 && minutes > 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                } else if (seconds === 0 && hours > 0) {
                    setSeconds(59);
                    setMinutes(59);
                    setHours(hours - 1);
                } else if (seconds === 0 && minutes === 0) {
                    console.log('timer done');
                    setTimerActive(false);
                    setTimerDone(true);
                }
            };
        }, 1000);
        return () => clearTimeout(timer);
    }, [hours, minutes, seconds, timerActive]);

    useEffect( () => {
        const changeTimerDone = setTimeout( () => {
            if (timerDone) {
                console.log('turning off timer because done');
                setTimerDone(false);
            }
        }, 5000);
        return () => clearTimeout(changeTimerDone);
    }, [timerDone]);

    return (
        <TimerWrapper>
            <div className='con timer'>
                <h1 className='act-name'>{activity}</h1>
                <div className='time'>
                    { hours ? <h1>{hours} hours</h1> : null}
                    { minutes ? <h1>{minutes} minutes</h1> : null}
                    { seconds ? <h1>{seconds} seconds</h1> : null}
                </div>
                { timerDone ? <h1 className='timer-complete-msg'>timer complete</h1> : null}
                <button 
                    onClick={startPauseHandler}>
                    {timerActive ? 'pause timer' : 'start timer'} </button>
                { !timerActive ? <button onClick={resetTimerHandler}>reset timer</button> : null}
                <button onClick={ () => setShowTimer(false) }>close</button>
            </div>
        </TimerWrapper>
    );
};

export default Timer;