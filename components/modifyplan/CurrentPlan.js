import React, { useEffect, useState } from "react";
import { userService, planService, plantService, plantingService } from "services";

import styles from "~styles/components/modifyplan/currentplan.module.scss";

const CurrentPlan = (props) => {
    const [planting, setPlanting] = useState({
        plan_id: "",
        plant_id: props.plantId,
        seeds: null,
        harvest: "",
        direct_sow: false,
        pinch: false,
        pot_on: false,
        succession: "",
        spacing: ""
    })
    
    useEffect(() => {
        getPlan();
        getPlantById();
    }, [])

    //... get plan id
    const getPlan = async () => {
        var _plan = await planService.getByUserId(userService.getId());
        setPlanting(planting => ({
            ...planting,
            plan_id: _plan.data._id
        }))
    }

    //... get plant name, species, description
    const [plant, setPlant] = useState({});
    const getPlantById = async () => {
        var _result = await plantService.getById(props.plantId);
        setPlant(_result.data)
    }

    const [pinchCheckbox, setPinchCheckbox] = useState(false);
    const [potCheckbox, setPotCheckbox] = useState(false);

    const seeds = [
        { label: "Direct Sow", value: 1 },
        { label: "Direct Indoors", value: 2 }
    ]
    const [activeSeed, setActiveSeed] = useState(-1);

    const harvests = [
        { label: "Early", value: 1 },
        { label: "Regular", value: 2 },
        { label: "Late", value: 3 }
    ]
    const [activeHarvest, setActiveHarvest] = useState(-1);

    const save = async () => {
        const result = await plantingService.create(planting);
        alert(result.message);
        props.savePlanting();
    }

    const reset = () => {
        setPlanting(planting => ({
            ...planting,
            seeds: null,
            succession: "",
            spacing: ""
        }))
        setActiveSeed(-1);
        setActiveHarvest(-1);
        setPinchCheckbox(false);
        setPotCheckbox(false);
    }

    return (
        <div className={styles.container}>
            <div className="modal-header">
                <h5 className="modal-title">{props.title}</h5>
            </div>
            <div className={styles.currentPlanContainer}>
                <div className={styles.planDetailsContainer}>
                    <div className={styles.planImage}></div>
                    <div className={styles.planInfoContainer}>
                        <h3>{plant.name}</h3>
                        <h4>{plant.species}</h4>
                        <h5>{plant.description}</h5>
                    </div>
                </div>
                <div className={styles.planOptionsContainer}>
                    <div className={styles.seedingRow}>
                        <h4>Seeding</h4>
                        {seeds.map((element, i) => (
                            <button key={i} 
                                onClick={() => {setActiveSeed(element.value), setPlanting({...planting, direct_sow: element.value === 1 ? true : false})}} 
                                className={activeSeed === i + 1 ?  styles.selected : ''}
                                value={planting.direct_sow}
                            >
                                {element.label}
                            </button>
                        ))}
                    </div>
                    <div className={styles.quantityRow}>
                        <h4>Quantity</h4>
                        <input type="number" placeholder="# of seeds" value={planting.seeds === null ? "" : planting.seeds} onChange={(e) => setPlanting({...planting, seeds: e.target.value })} />
                    </div>
                    <div className={styles.harvestRow}>
                        <h4>Harvest</h4>
                        {harvests.map((element, i) => (
                            <button key={i} 
                                onClick={() => {setActiveHarvest(element.value), setPlanting({...planting, harvest: element.value === 1 ? "early" : element.value === 2 ? "regular" : "late"})}} 
                                className={activeHarvest === i + 1 ?  styles.selected : ''}
                                value={planting.harvest}
                            >
                                {element.label}
                            </button>
                        ))}
                    </div>
                    <div className={styles.successionContainer}>
                        <div className={styles.successionContainer1}>
                            <div className={styles.successionTextContainer}>
                                <h4>Successions</h4>
                                <h5>You can always adjust spacing later.</h5>
                            </div>
                            <div className={styles.successionButtonsContainer}>
                                <div>
                                    <input value={planting.succession} onChange={(e) => setPlanting({...planting, succession: e.target.value})} /> 
                                    <span>Plantings</span>
                                </div>
                                <div>
                                    <input value={planting.spacing} onChange={(e) => setPlanting({...planting, spacing: e.target.value})} />
                                    <span>Days Between</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.successionCheckboxesContainer}>
                            <div className={styles.successionCheckboxRow}>
                                <h6>Pinch</h6>
                                <div
                                    onClick={() => {setPinchCheckbox(!pinchCheckbox), setPlanting({...planting, pinch: !pinchCheckbox})}}
                                    className={`${styles.checkbox} ${pinchCheckbox ? styles.active : null}`}
                                ></div>
                            </div>
                            <div className={styles.successionCheckboxRow}>
                                <h6>Pot On</h6>
                                <div
                                    onClick={() => {setPotCheckbox(!potCheckbox), setPlanting({...planting, pot_on: !potCheckbox})}}
                                    className={`${styles.checkbox} ${potCheckbox ? styles.active : null}`}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={() => save()}>Save Changes</button>
                <button onClick={() => reset()}>Reset</button>
            </div>
        </div>
    );
};

export default CurrentPlan;
