import React from "react";

import styles from "~styles/pages/modifyplan.module.scss";

import Sidebar from "~components/sidebar";

const ModifyPlan = () => {
  return (
    <div className={styles.screen}>
      <Sidebar />
      <h2>Modify Plan</h2>
    </div>
  );
};

export default ModifyPlan;
