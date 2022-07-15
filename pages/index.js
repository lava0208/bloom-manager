import React from "react";

import styles from "~styles/pages/dashboard.module.scss";

import Sidebar from "~components/Sidebar";

const Dashboard = () => {
  return (
    <div className={styles.screen}>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
