import React from "react";

import { byPlant } from "~lib/dummy";

import styles from "~styles/components/masterplan/byplant.module.scss";

const ByPlant = () => {
    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h2>2023 Plan Plantings</h2>
                <input className={styles.searchButton} placeholder={'Search'} />
            </div>
            <div className={styles.plantsContainer}>
                {byPlant.plants.map((plant, i) => (
                    <div className={styles.plantContainer} key={i}>
                        <div className={styles.plantImage}></div>
                        <div className={styles.plantInfoContainer}>
                            <div className={styles.plantInfoHeaderContainer}>
                                <div className={styles.plantInfoHeader}>
                                    <div>
                                        <h3>{plant.name}</h3>
                                        <h5>{plant.description}</h5>
                                    </div>
                                    <h4>{plant.unit}ct</h4>
                                </div>
                                <div className={styles.plantOptionsContainer}>
                                    <h5>Start</h5>
                                    <h5>Regular</h5>
                                    <h5>Pinch</h5>
                                    <h5>Pot On</h5>
                                </div>
                            </div>
                            <div className={styles.plantInfoFooterContainer}>
                                <button>View & Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ByPlant;
