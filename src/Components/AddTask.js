
import React, { useState, useEffect} from 'react';
import styled from 'styled-components';

const AddTaskWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    z-index: 5;
    margin: 2.5% 0;
    padding: 0 2.5%;
    form {
        display: flex;
        flex-direction: column;
        width: 50%;
        margin-inline: auto;
    }
`;

const AddTask = ({ showAddTaskHandler, setActivities }) => {
    const [actField, setActField] = useState('');
    const [actHr, setActHr] = useState(0);
    const [actMin, setActMin] = useState(0);
    const [actSec, setActSec] = useState(0);

    const addHandler = () => {
        let act = localStorage.getItem('activities');
        let obj = {
            activity: actField,
            hrGoal: actHr,
            minGoal: actMin,
            secGoal: actSec,
            hrLeft: actHr,
            minLeft: actMin,
            secLeft: actSec
        };
        if (!localStorage.getItem('activities')) {
            let arr = [];
            arr.push(obj);
            localStorage.setItem('activities', JSON.stringify(arr));
        }
        else {
            let arr = JSON.parse(act);
            arr.push(obj);
            localStorage.setItem('activities', JSON.stringify(arr));
        }
        showAddTaskHandler();
    };

    return (
        <AddTaskWrapper>
            <div className=''>
                <h1>new activity</h1>
                <form>
                    <label htmlFor="activity">activity name</label><br/>
                    <input onChange={ (e) => setActField(e.target.value)} type="text" />
                    <label htmlFor="hours">hours</label>
                    <select onChange={ (e) => setActHr(e.target.value) } name="hours" id="hours" defaultValue={0}>
                        { [...Array(25).keys()].map( (item, key) => {
                            return <option value={item} key={key}>{item}</option>
                        })}
                    </select>
                    <label htmlFor="minutes">minutes</label>
                    <select onChange={ (e) => setActMin(e.target.value) } name="minutes" id="minutes" defaultValue={0}>
                        { [...Array(60).keys()].map( (item, key) => {
                            return <option value={item} key={key}>{item}</option>
                        })}
                    </select>
                    <label htmlFor="seconds">seconds</label>
                    <select onChange={ (e) => setActSec(e.target.value) } name="seconds" id="seconds" defaultValue={0}>
                        { [...Array(60).keys()].map( (item, key) => {
                            return <option value={item} key={key}>{item}</option>
                        })}
                    </select>
                </form>
                <button onClick={addHandler}>add</button>
                <button onClick={showAddTaskHandler}>close</button>
            </div>
        </AddTaskWrapper>
    );
};

export default AddTask;