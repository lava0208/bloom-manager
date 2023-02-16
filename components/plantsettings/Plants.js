import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import { settingsPlants } from "~lib/dummy";

import { userService, plantService } from "services";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/plantsettings/plants.module.scss";

const Plants = () => {
    const [plant, setPlant] = useState({
        user_id: "",
        name: "",
        species: "",
        description: "",
        earliest_seed: null,
        latest_seed: null,        
        direct_sow_early: null,
        direct_sow_late: null,
        cold_stratify: null,
        pinch: null,
        pot_on: null,
        harden: null,
        transplant: null,
        maturity_early: null,
        maturity_late: null,
        light: false,
        depth: null,
        reBloom: false,
        indoor_seed_note: "",
        direct_seed_note: "",
        pinch_note: "",
        pot_on_note: "",
        transplant_note: "",
        harvest_note: "",
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [isShowActionText, setIsShowActionText] = useState(-1);
    const openCreateModal = () => {
        setModalOpen(true);
    }

    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const [query, setQuery] = useState('');
    const search = (e) => {
        setQuery(e.target.value)
    }
    const searchFilter = (array) => {
        return array.filter(
            (el) => Object.keys(el).some((parameter) => 
                el[parameter].toString().toLowerCase().includes(query)
            )
        )
    }
    const filtered = searchFilter(settingsPlants)

    const savePlant = async () => {
        if (plant.name !== "" && plant.species !== "" && plant.description !== "") {
            plant.user_id = userService.getId();
            const result = await plantService.create(plant);
            console.log(result);
            if(result.status === true){
                setModalOpen(!modalOpen);
            }
        } else {
            setError(true);
            setErrorText("Please fill all fields.");
        }
    }

    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.addCustomContainer} onClick={() => openCreateModal()}>
                    <button>Add New Custom</button>
                </div>
                <input className={styles.searchButton} placeholder={'Search'} onChange={search} />
            </div>
            <div className={styles.plantsContainer}>
                {filtered.map((plant, i) => (
                    <div className={styles.plantContainer} key={i} onMouseEnter={() => setIsShowActionText(i)} onMouseLeave={() => setIsShowActionText(-1)}>
                        <div className={styles.plantImage}></div>
                        <div className={styles.plantInfoContainer}>
                            <h3>{plant.name}</h3>
                            <h4>{plant.variety}</h4>
                            <h5>{plant.description}</h5>
                        </div>
                        {
                            i === isShowActionText && (
                                <div className={styles.plantHoverText}>
                                    <button onClick={() => openCreateModal()}>Edit</button>
                                    <button>Remove</button>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
            <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} modalClassName="customPlantModal">
                <ModalHeader>
                    Add New Custom Plant
                </ModalHeader>
                <ModalBody>
                    <div className={styles.plantsContainer}>
                        <div className={styles.modalImage}></div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Variety Name"
                                value={plant.name}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        name: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Species"
                                value={plant.species}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        species: e.target.value,
                                    });
                                }}
                            />
                            <textarea
                                cols="2"
                                className={styles.input}
                                placeholder="Description"
                                value={plant.description}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        description: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className={styles.inputContainer + " col-md-6"}>
                            <h5>Indoor Timing</h5>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Early Seed"
                                value={plant.earliest_seed}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        earliest_seed: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Late Seed"
                                value={plant.latest_seed}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        latest_seed: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Pinch"
                                value={plant.pinch}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        pinch: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Pot On"
                                value={plant.pot_on}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        pot_on: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Harden"
                                value={plant.harden}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        harden: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Transplant"
                                value={plant.transplant}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        transplant: e.target.value,
                                    });
                                }}
                            />
                            <h5 className="mt-3">Harvest</h5>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Maturity Early"
                                value={plant.maturity_early}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        maturity_early: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Maturity Late"
                                value={plant.maturity_late}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        maturity_late: e.target.value,
                                    });
                                }}
                            />
                            <h6 className="d-flex align-items-center">
                                <label htmlFor="rebloom">Rebloom?</label>
                                <input
                                    type="checkbox"
                                    id="rebloom"
                                    checked={plant.reBloom}
                                    onChange={(e) => {
                                        setPlant({
                                            ...plant,
                                            reBloom: e.target.checked,
                                        });
                                    }}
                                />
                            </h6>
                            <h5 className="mt-3">Transplant Note</h5>
                            <textarea
                                cols="3"
                                checked={plant.transplant_note}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        transplant_note: e.target.value,
                                    });
                                }}
                            />
                            <h5 className="mt-3">Pinch Note</h5>
                            <textarea
                                cols="3"
                                checked={plant.pinch_note}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        pinch_note: e.target.value,
                                    });
                                }}
                            ></textarea>
                        </div>
                        <div className={styles.inputContainer + " col-md-6"}>
                            <h5>Direct Seed Timing</h5>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Direct Seed"
                                value={plant.direct_sow_early}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        direct_sow_early: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Pinch"
                                value={plant.direct_sow_late}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        direct_sow_late: e.target.value,
                                    });
                                }}
                            />
                            <h5>Seeding</h5>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Depth (mm)"
                                value={plant.depth}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        depth: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="Cold Stratify (weeks)"
                                value={plant.cold_stratify}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        cold_stratify: e.target.value,
                                    });
                                }}
                            />
                            <h6 className="d-flex align-items-center">
                                <label htmlFor="light">Light for germination</label>
                                <input type="checkbox" id="light"
                                    checked={plant.light}
                                    onChange={(e) => {
                                        setPlant({
                                            ...plant,
                                            light: e.target.checked,
                                        });
                                    }}
                                />
                            </h6>
                            <h5 className="mt-3">Indoor Seed Note</h5>
                            <textarea
                                cols="3"
                                value={plant.indoor_seed_note}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        indoor_seed_note: e.target.value,
                                    });
                                }}
                            />
                            <h5>Direct Seed Note</h5>
                            <textarea
                                cols="3"
                                value={plant.direct_seed_note}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        direct_seed_note: e.target.value,
                                    });
                                }}
                            />
                            <h5>Pot On Note</h5>
                            <textarea
                                cols="3"
                                value={plant.pot_on_note}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        pot_on_note: e.target.value,
                                    });
                                }}
                            />
                            <h5>Harvest Note</h5>
                            <textarea
                                cols="3"
                                value={plant.harvest_note}
                                onChange={(e) => {
                                    setPlant({
                                        ...plant,
                                        harvest_note: e.target.value,
                                    });
                                }}
                            ></textarea>
                        </div>
                        <div className={styles.inputContainer + " text-center"}>
                            {
                                error && (
                                    <p className={styles.errorText}>{errorText}</p>
                                )
                            }
                            <button onClick={() => { savePlant() }}>Save Changes</button>
                            <button onClick={() => setModalOpen(!modalOpen)}>Cancel</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default Plants;
