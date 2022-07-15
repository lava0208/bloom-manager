import React from "react";

import styles from "~styles/pages/masterplan.module.scss";

import Sidebar from "~components/Sidebar";

const MasterPlan = () => {
  return (
    <div className={styles.screen}>
      <Sidebar />
      <div className={styles.container}>
        <h1 className={styles.header}>2022 Season</h1>
        <h2 className={styles.subHeader}>Master Plan</h2>
      </div>
    </div>
  );
};

export default MasterPlan;
