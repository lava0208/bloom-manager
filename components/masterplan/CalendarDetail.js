import React, { useEffect, useState } from "react";
import { taskService, plantingService } from "services";

import styles from "~styles/components/masterplan/calendardetail.module.scss";

const CalendarDetail = (props) => {
    const [task, setTask] = useState({});
    const [nextTask, setNextTask] = useState({});
    const [planting, setPlanting] = useState({});
    useEffect(() => {
        getTask();
    }, [])

    const getTask = async () => {
        const _task = await taskService.getById(props.taskId);
        setTask(_task.data);

        const _tasks = await taskService.getByPlantingId(_task.data.planting_id);
        const tmpObj = _tasks.data.find(x => x._id = _task.data._id);
        const tmpIndex = _tasks.data.indexOf(tmpObj);
        if(tmpIndex >= 0 && tmpIndex < _tasks.data.length - 1){
            const _nextItem = _tasks.data[tmpIndex + 1]
            setNextTask(_nextItem);
        }
        
        const _planting = await plantingService.getById(_task.data.planting_id);
        setPlanting(_planting.data);
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.calendarTitle}>
                <h3>{planting ? planting.name : ""}</h3>
                <h5>{planting ? planting.species : ""}</h5>
            </div>
            <div className={styles.eventContainer}>
                <div className={styles.noteContainer}>
                    <div className={styles.noteImage}></div>
                    <div className={styles.noteInfo}>
                        <h5>{planting ? planting.name : ""}</h5>
                        <h6>{planting ? planting.description : ""}</h6>
                    </div>
                </div>
                <div className={styles.taskContainer}>
                    <div className={styles.detailContainer}>
                        <h3>{task ? task.title : ""}</h3>
                        <h5>{task ? task.note : ""}</h5>
                    </div>
                    <div className={styles.nextContainer}>
                        <h4>Next Task:</h4>
                        {
                            nextTask && (
                               <div>  {nextTask.title} </div>
                                // <h5>{nextTask.title} in {task.duration} days</h5>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={() => props.saveSchedule(props)}>Mark Complete</button>
                <button onClick={props.cancelSchedule}>Cancel</button>
            </div>
        </div>
    );
};

export default CalendarDetail;