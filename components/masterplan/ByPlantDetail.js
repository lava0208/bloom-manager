import React, { useState, useEffect } from "react";
import moment from "moment";

import { userService, planService, plantService, plantingService } from "services";

import styles from "~styles/components/masterplan/byplantdetail.module.scss";

const ByPlantDetail = (props) => {
    const [planting, setPlanting] = useState({
        plan_id: "",
        plant_id: props.plantId,
        seeds: "",
        harvest: "",
        direct_sow: false,
        pinch: false,
        pot_on: false,
        succession: "",
        spacing: ""
    })

    useEffect(() => {        
        if(props.planting){
            //... edit page
            getPlanting();
        }
    }, [props.planting])

    const [plant, setPlant] = useState({});


    const getPlanting = async () => {
        var _plant = await plantService.getById(props.plantId);
        setPlant(_plant.data);
        setPlanting(props.planting)
    }

    console.log(planting);
    const [customTask, setCustomTask] = useState({
        title: "",
        date: "",
        duration: "",
        note: ""
    });
    const saveCustomTask = () => {
        console.log(customTask)
    }

    return (
        <div className={styles.container}>
            <div className={styles.plantTitle}>
                <h3>{plant.species}</h3>
                <h5>Planting ID #{props.planting._id}</h5>
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
                    <button onClick={() => saveCustomTask()}>Add</button>
                </div>
            </div>
            <div className={styles.plantOptionsContainer}>
                {/* {plantings.map((option, i) => (
                    <div className={styles.plantOptionRow} key={i}>
                        <div className={styles.plantOptionsHeader}>
                            <div className={styles.plantOptionName}>
                                <h3>{option.name}</h3>
                                <div>
                                    <input placeholder="" />
                                    <span>{option.day}</span> days
                                </div>
                            </div>
                            <button>{moment(option.date).format("MMMM Do, YYYY")}</button>
                        </div>
                        <div className={styles.plantOptionsFooter}>
                            <select>
                                <option value="complete">Complete</option>
                                <option value="incomplete">InComplete</option>
                                <option value="overdue">Overdue</option>
                                <option value="notdue">Not Overdue</option>
                            </select>
                            <div className={styles.buttons}>
                                <button>Duplicate</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    </div>
                ))} */}
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={props.savePlant}>Save</button>
                <button onClick={props.cancelPlant}>Cancel</button>
            </div>
        </div>
    );
};

export default ByPlantDetail;