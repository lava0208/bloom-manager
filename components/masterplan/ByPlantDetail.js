/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { plantService, taskService } from "services";

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

    const dateFormat = (date) =>{
        return moment(date).format("YYYY/MM/DD")
    }

    const [customTask, setCustomTask] = useState({
        planting_id: props.plantingId,
        title: "",
        scheduled_at: moment().format('YYYY/MM/DD'),
        duration: "",
        note: "",
        type: "",
        rescheduled_at: "",
        completed_at: ""
    });

    
    const addCustomTask = () => {
        if(customTask.title === "" || customTask.scheduled_at === "" || customTask.duration === "" || customTask.note === ""){
            alert("Please fill all fields")
        }else{
            setTaskArr(taskArr => [...taskArr, customTask])
            setCustomTask(
                ...taskArr, {
                    planting_id: props.plantingId,
                    title: "",
                    scheduled_at: moment().format('YYYY/MM/DD'),
                    duration: "",
                    note: "",
                    type: "incomplete",
                    rescheduled_at: "",
                    completed_at: ""
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

    const deleteTask = async (id) => {
        if (confirm('Are you sure you want to delete?')) {
            var _result = await taskService.delete(id);
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
                    <div className={styles.detailImage}>
                        {
                            plant.image && (
                                <img src={"/assets/upload/" + plant.image } alt="image" />
                            )
                        }
                    </div>
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
                    <DatePicker
                        placeholderText="Date"
                        className={customTask.scheduled_at}
                        value={dateFormat(customTask.scheduled_at)}
                        selected={new Date(customTask.scheduled_at)}
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                scheduled_at: e,
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
                    <button className={styles.add} onClick={() => addCustomTask()}>Add</button>
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
                            <button>{moment(task.scheduled_at).format("MMMM DD, YYYY")}</button>
                        </div>
                        <div className={styles.plantOptionsFooter}>
                            <select 
                                value={task.type}
                                onChange={(e) => {
                                    let _taskArr = [...taskArr];
                                    _taskArr[i].type = e.target.value;
                                    setTaskArr(_taskArr);
                                }}
                            >
                                <option value="complete">Complete</option>
                                <option value="incomplete">InComplete</option>
                                <option value="overdue">Overdue</option>
                                <option value="notdue">Not Overdue</option>
                            </select>
                            <div className={styles.buttons}>
                                {/* <button>Duplicate</button>  */}
                                <button onClick={() => deleteTask(task._id)}>Delete</button>
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