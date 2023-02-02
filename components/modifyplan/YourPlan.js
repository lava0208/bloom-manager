import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";

import { yourPlan } from "~lib/dummy";
import CurrentPlan from "./CurrentPlan";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/modifyplan/yourplan.module.scss";

const YourPlan = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [isShowActionText, setIsShowActionText] = useState(-1);
    const openCreateModal = () => {
        setModalOpen(true);
    }
    return (
        <>
            <div className={styles.container}>
                <h2>Your Plan</h2>

                <div className={styles.scrollContainer}>
                    {yourPlan.map((plan, i) => (
                        <div className={styles.planContainer} key={i} onMouseEnter={() => setIsShowActionText(i)} onMouseLeave={() => setIsShowActionText(-1)}>
                            <div className={styles.planHeader}>
                                <h3>{plan.name}</h3>
                                <h3>{plan.count}ct</h3>
                            </div>
                            <h4 className={styles.planSpecies}>{plan.species}</h4>
                            <div className={styles.planOptionsContainer}>
                                <h5>Start</h5>
                                <h5>Regular</h5>
                                <h5>Pinch</h5>
                                <h5>Pot On</h5>
                            </div>
                            {plan.notes && <h6 className={styles.planNotes}>{plan.notes}</h6>}
                            {
                                i === isShowActionText && (
                                    <div className={styles.plantHoverText}>
                                        <button>Delete</button>
                                        <button onClick={() => openCreateModal()}>Edit</button>
                                    </div>
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>
            <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} centered modalClassName="modifyPlanModal">
                <ModalBody>
                    <CurrentPlan title="Edit Crimson Glory" />
                </ModalBody>
            </Modal>
        </>
    );
};

export default YourPlan;
