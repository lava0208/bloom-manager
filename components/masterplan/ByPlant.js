import React, { useState, useEffect } from "react";

import { Modal, ModalBody } from "reactstrap";
import { plantingService } from "services";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/masterplan/byplant.module.scss";

import ByPlantDetail from "./ByPlantDetail";

const ByPlant = () => {
    const [planEditModalOpen, setPlanEditModalOpen] = useState(false);
    const [plantings, setPlantings] = useState([]);
    const [plantId, setPlantId] = useState("");
    const [planting, setPlanting] = useState({});
    const openPlanEditModal = async (id, plant_id) => {
        setPlanEditModalOpen(true);
        setPlantId(plant_id);
        var _result = await plantingService.getById(id);
        setPlanting(_result.data);
    }
    const savePlanting = () => {
        getAllPlantings();
        setPlanEditModalOpen(false);
    }

    useEffect(() => {
        getAllPlantings();
    }, [])

    const getAllPlantings = async () => {
        var _result = await plantingService.getAll();        
        setPlantings(_result.data);
    }


    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h2>2023 Plan Plantings</h2>
                <input className={styles.searchButton} placeholder={'Search'} />
            </div>
            <div className={styles.plantsContainer}>
                {plantings.map((planting, i) => (
                    <div className={styles.plantContainer} key={i}>
                        <div className={styles.plantImage}></div>
                        <div className={styles.plantInfoContainer}>
                            <div className={styles.plantInfoHeaderContainer}>
                                <div className={styles.plantInfoHeader}>
                                    <div>
                                        <h3>{planting.name}</h3>
                                        <h5>{planting.species}</h5>
                                    </div>
                                    <h4>{planting.seeds}ct</h4>
                                </div>
                                <div className={styles.plantOptionsContainer}>
                                    <h5>{planting.direct_sow ? "Start" : "Direct"}</h5>
                                    <h5>{planting.harvest}</h5>
                                    <h5>{planting.pinch ? "Pinch" : ""}</h5>
                                    <h5>{planting.pot_on ? "Pot On" : ""}</h5>
                                </div>
                            </div>
                            <div className={styles.plantInfoFooterContainer}>
                                <button onClick={() => {openPlanEditModal(planting._id, planting.plant_id)}}>View & Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal toggle={() => setPlanEditModalOpen(!planEditModalOpen)} isOpen={planEditModalOpen} centered modalClassName="modifyPlanModal">
                <ModalBody>
                    <ByPlantDetail plantId={plantId} planting={planting} savePlanting={savePlanting} onClick={() => setModalOpen(false)} />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ByPlant;
