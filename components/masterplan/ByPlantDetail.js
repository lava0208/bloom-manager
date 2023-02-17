import React, { useState, useEffect } from "react";
import moment from "moment";

import { plantService, plantingService, taskService } from "services";

import styles from "~styles/components/masterplan/byplantdetail.module.scss";

const ByPlantDetail = (props) => {
    const [taskArr, setTaskArr] = useState([]);

    useEffect(() => {        
        getPlantAndTasks();
    }, [])

    const [plant, setPlant] = useState({});

    const getPlantAndTasks = async () => {
        var _plant = await plantService.getById(props.plantId);
        setPlant(_plant.data);
        var _tasks = await taskService.getByPlantingId(props.plantingId);
        setTaskArr(_tasks.data)
    }

    const [customTask, setCustomTask] = useState({
        planting_id: props.plantingId,
        title: "",
        date: "",
        duration: "",
        note: ""
    });

    
    const addCustomTask = () => {
        if(customTask.title === "" || customTask.date === "" || customTask.duration === "" || customTask.note === ""){
            alert("Please fill all fields")
        }else{
            setTaskArr(taskArr => [...taskArr, customTask])
            setCustomTask(
                ...taskArr, {
                    planting_id: props.plantingId,
                    title: "",
                    date: "",
                    duration: "",
                    note: ""
                }
            )
        }
    }

    const save = async () => {
        if (confirm('Are you sure you want to update?')) {
            var _result = await taskService.update(props.plantingId, taskArr);
            alert(_result.message);
            props.close();
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.plantTitle}>
                <h3>{plant.species}</h3>
                <h5>Planting ID #{props.plantingId}</h5>
            </div>
            <div className={styles.plantInfoContainer}>
                <div className={styles.detailContainer}>
                    <div className={styles.detailImage}></div>
                    <div className={styles.detailInfo}>
                        <h3>{plant.name}</h3>
                        <h5>{plant.species}</h5>
                        <h6>{plant.description}</h6>
                    </div>
                </div>
                <div className={styles.taskContainer}>
                    <h3>Add Custom Task</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={customTask.title}
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                title: e.target.value,
                            });
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Date"
                        value={customTask.date}
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                date: e.target.value,
                            });
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Duration"
                        value={customTask.duration}
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                duration: e.target.value,
                            });
                        }}
                    />
                    <textarea
                        placeholder="Note"
                        value={customTask.note}
                        rows="3"
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                note: e.target.value,
                            });
                        }}
                    />
                    <button onClick={() => addCustomTask()}>Add</button>
                </div>
            </div>
            <div className={styles.plantOptionsContainer}>
                {taskArr.map((task, i) => (
                    <div className={styles.plantOptionRow} key={i}>
                        <div className={styles.plantOptionsHeader}>
                            <div className={styles.plantOptionName}>
                                <h3>{task.title}</h3>
                                <div>
                                    <input placeholder="" value={task.duration} readOnly />
                                    <span>{task.duration}</span> days
                                </div>
                            </div>
                            <button>{moment(task.date).format("MMMM Do, YYYY")}</button>
                        </div>
                        <div className={styles.plantOptionsFooter}>
                            <select>
                                <option value="complete">Complete</option>
                                <option value="incomplete">InComplete</option>
                                <option value="overdue">Overdue</option>
                                <option value="notdue">Not Overdue</option>
                            </select>
                            <div className={styles.buttons}>
                                {/* <button>Duplicate</button>  */}
                                <button>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={() => save()}>Save</button>
                <button onClick={props.close}>Cancel</button>
            </div>
        </div>
    );
};

export default ByPlantDetail;