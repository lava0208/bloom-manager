import React from "react";

import { settingsPlants } from "~lib/dummy";

import styles from "~styles/components/plantsettings/plants.module.scss";

const Plants = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.addCustomContainer}>
          <h2>Plants</h2>
          <button>Add New Custom</button>
        </div>
        <button className={styles.searchButton}>Search</button>
      </div>
      <div className={styles.plantsContainer}>
        {settingsPlants.map((plan) => (
          <div className={styles.plantContainer}>
            <div className={styles.plantImage}></div>
            <div className={styles.plantInfoContainer}>
              <h3>{plan.name}</h3>
              <h4>{plan.variety}</h4>
              <h5>{plan.description}</h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Plants;
