import React from "react";

import styles from "~styles/pages/plantsettings.module.scss";

import Sidebar from "~components/Sidebar";

const PlantSettings = () => {
  return (
    <div className={styles.screen}>
      <Sidebar />
      <h2>Plant Settings</h2>
    </div>
  );
};

export default PlantSettings;
