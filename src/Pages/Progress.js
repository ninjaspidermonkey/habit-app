
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavbarHeader from '../Components/Navbar';
import Timer from '../Components/Timer';
import Activity from '../Components/Activity';
import AddTask from '../Components/AddTask';

const ProgressWrapper = styled.div`
    // main
    min-height: 100vh;
    min-width: 100vw;
    background-color: #f1f1f1;
    color: #1b1b1b;
    .content {
        margin: 5% 0;
    }

    // utilities
    .con {
        display: flex;
        flex-direction: column;
        margin-inline: auto;
        width: min(90%, 70.5rem);
    }
    .bor1 {
        border: 1px solid blue;
    }
    .bor2 {
        border: 1px solid red;
    }
    .pad {
        padding: 5%;
    }
    .margin-inline {
        margin-inline: auto;
    }

    // positioning
    .header-two-col {
        display: flex;
        margin-bottom: 2.5%;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        .header-col1 {
            width: 70%;
            padding-inline: 2.5%;
        }
        .header-col2 {
            width: 30%;
        }
    }

    // elements
    button {
        border: none;
        width: 100%;
        height: 5vh;
        background-color: #d9d9d9;
        color: #1b1b1b;
        box-shadow: 0 5px 10px rgba(154,160,185,.4), 0 15px 40px rgba(166,173,201,.1);
        border-radius: 8px;
        &:hover {
            cursor: pointer;
        }
        &:active {

        }
    }

`;

const Progress = () => {
    const [showAddTask, setShowAddTask] = useState(false);
    const [activities, setActivities] = useState([
        /*{
            activity: 'read',
            hrGoal: 1,
            minGoal: 30,
            secGoal: 0,
        },
        {
            activity: 'eat hot dog',
            hrGoal: 0,
            minGoal: 0,
            secGoal: 20,
        },*/
    ]);

    useEffect( () => {
        let act = localStorage.getItem('activities');
        if (act) {
            setActivities(JSON.parse(act))
        }
    }, [localStorage.getItem('activities')]);

    const showAddTaskHandler = () => {
        setShowAddTask(!showAddTask);
    }

    return (
        <ProgressWrapper>
            <NavbarHeader />
            <div className='content'>
                <section className="con">
                    <div className="header-two-col">
                        <h1 className="header-col1">my activities</h1>
                        <button className="header-col2" onClick={showAddTaskHandler}>new activity</button>
                    </div>
                    { showAddTask ? <AddTask
                                        showAddTaskHandler={showAddTaskHandler}
                                        setActivities={setActivities}
                    /> : null }
                </section>
                <section className='activities con'>
                    { activities.map( (item, key) => {
                        return <div key={key}>
                            <Activity 
                                activity={item.activity}
                                hrGoal={item.hrGoal}
                                minGoal={item.minGoal}
                                secGoal={item.secGoal}
                            />
                        </div>
                    })}
                </section>

            </div>
        </ProgressWrapper>
    );
};

export default Progress;