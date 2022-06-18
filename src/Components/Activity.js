
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Timer from './Timer';

const ActivityWrapper = styled.div`
    position: relative;
    //background-color: #e1e1e1;
    background-color: #f3f3f3;
    color: #121212;
    margin: 2.5% 0;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(154,160,185,.4), 0 15px 40px rgba(166,173,201,.1);

    .act-display {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        cursor: pointer;

        .act-col1 {
            h1 {
                font-size: 1.75rem;
                color: #1b1b1b;
            }
            p {
                color: #2b2b2b;
            }
            width: 70%;
            flex-direction: column;
            margin: 5% 0;
            padding: 0 5%;
            border-right: 1px solid #ccc;
        }
        .act-col2 {
            width: 30%;
            flex-direction: column;
            margin: auto 0;
            padding: 5% 0;
            align-items: center;
            text-align: center;
            p {
                padding: 5%;
            }
        }
    }
    .act-extended {
        display: flex;
        flex-direction: column;
        border-top: 1px solid #ccc;
        line-height: 2;
        padding: 2.5% 0;
        animation: dropDown 10s infinite alternate;
        //padding: 5%;
        button {
            //background-color: #f9f9f9;
            margin: 2.5% auto;
            width: 90%;
            height: 7.5vh;
            box-shadow: 0 5px 10px rgba(154,160,185,.4), 0 15px 40px rgba(166,173,201,.1);
        }
    }

`;

const Activity = ({ activity, hrGoal, minGoal, secGoal, dateCreated }) => {
    const [complete, setComplete] = useState(false);
    const [extended, setExtended] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [hrLeft, setHrLeft] = useState(null);
    const [minLeft, setMinLeft] = useState(null);
    const [secLeft, setSecLeft] = useState(null);
    const [timerHr, setTimerHr] = useState(0);
    const [timerMin, setTimerMin] = useState(0);
    const [timerSec, setTimerSec] = useState(0);
    const [showTimer, setShowTimer] = useState(false);
    const [timerActive, setTimerActive] = useState(false);

    // time left is goal - timer

    const hrLeftSetter = (val) => {
        return setHrLeft(val);
    };
    const minLeftSetter = (val) => {
        return setMinLeft(val);
    };
    const secLeftSetter = (val) => {
        return setSecLeft(val);
    };

    useEffect( () => {
        let act = JSON.parse(localStorage.getItem(`${activity}`));
        if (act) {
            setHrLeft(act.hrLeft);
            setMinLeft(act.minLeft);
            setSecLeft(act.secLeft);
        } else {
            setHrLeft(hrGoal);
            setMinLeft(minGoal);
            setSecLeft(secGoal);
        }
    }, []);

    useEffect( () => {
        if (showTimer) {
            let actObj = {
                name: activity,
                hrGoal: hrGoal,
                minGoal: minGoal,
                secGoal: secGoal,
                hrLeft: hrLeft,
                minLeft: minLeft,
                secLeft: secLeft
            };
            localStorage.setItem(`${activity}`, JSON.stringify(actObj));
        }
    }, [hrLeft, minLeft, secLeft]);

    return (
        <ActivityWrapper>
            <section className='act-display' onClick={ () => setExtended(!extended) }>
                <div className='act-col1'>
                    <h1>{activity}</h1>
                    <p>
                        {hrGoal ? `${hrGoal}h `: null} 
                        {minGoal ? `${minGoal}m `: null} 
                        {secGoal ? `${secGoal}s `: null}
                    </p>
                </div>
                <div className='act-col2'>
                    <p>
                        {hrLeft ? `${hrLeft}h `: null} 
                        {minLeft ? `${minLeft}m `: null} 
                        {secLeft ? `${secLeft}s `: null}
                        { complete ? 'activity complete' : 'left'}
                    </p>
                </div>
            </section>
            { extended ? 
                <section className='act-extended'>
                    <button onClick={ () => setShowTimer(true) }>timer</button>
                    <button>edit</button>
                    <button>remove</button>
                    { showTimer ? <Timer
                                    activity={activity}
                                    showTimer={showTimer}
                                    setShowTimer={setShowTimer}
                                    hrGoal={hrGoal}
                                    minGoal={minGoal}
                                    secGoal={secGoal}
                                    hrLeft={hrLeft}
                                    minLeft={minLeft}
                                    secLeft={secLeft}
                                    hrLeftSetter={hrLeftSetter}
                                    minLeftSetter={minLeftSetter}
                                    secLeftSetter={secLeftSetter}
                                    setHrLeft={setHrLeft}
                                    />: null }
                </section>
                : null}
        </ActivityWrapper>
    );
};

export default Activity;