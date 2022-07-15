import React from "react";

import styles from "~styles/pages/modifyplan.module.scss";

import Sidebar from "~components/Sidebar";
import YourPlan from "~components/YourPlan";

const ModifyPlan = () => {
  return (
    <div className={styles.screen}>
      <Sidebar />
      <div className={styles.container}></div>
      <YourPlan />
    </div>
  );
};

export default ModifyPlan;
