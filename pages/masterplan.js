import React from "react";

import styles from "~styles/pages/masterplan.module.scss";

import Sidebar from "~components/Sidebar";

const MasterPlan = () => {
  return (
    <div className={styles.screen}>
      <Sidebar />
      <h2>Master Plan</h2>
    </div>
  );
};

export default MasterPlan;
