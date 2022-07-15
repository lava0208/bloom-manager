import React from "react";
import { useRouter } from "next/router";

import styles from "~styles/components/sidebar.module.scss";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={"/assets/logo.png"} />
        <div
          className={`${styles.link} ${
            router.pathname === "/" ? styles.active : null
          }`}
          onClick={() => router.push("/")}
        >
          <h3>Dashboard</h3>
        </div>
        <div
          className={`${styles.link} ${
            router.pathname === "/masterplan" ? styles.active : null
          }`}
          onClick={() => router.push("/masterplan")}
        >
          <h3>Master Plan</h3>
        </div>
      </div>
      <div className={styles.bottom}>
        <div
          className={`${styles.link} ${
            router.pathname === "/modifyplan" ? styles.active : null
          }`}
          onClick={() => router.push("/modifyplan")}
        >
          <h3>Modify Plan</h3>
        </div>
        <div
          className={`${styles.link} ${
            router.pathname === "/plantsettings" ? styles.active : null
          }`}
          onClick={() => router.push("/plantsettings")}
        >
          <h3>Plant Settings</h3>
        </div>
        <div className={styles.accountContainer}>
          <div className={styles.profilePicture}></div>
          <div className={styles.accountInfoContainer}>
            <h4>Roger</h4>
            <h5>Log Out</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
