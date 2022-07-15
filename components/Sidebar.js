import React from "react";
import { useRouter } from "next/router";

import styles from "~styles/components/sidebar.module.scss";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={"/assets/logo.png"} />
        <h3 className={styles.link} onClick={() => router.push("/")}>
          Dashboard
        </h3>
        <h3 className={styles.link} onClick={() => router.push("/masterplan")}>
          Master Plan
        </h3>
      </div>
      <div className={styles.bottom}>
        <h3 className={styles.link} onClick={() => router.push("/modifyplan")}>
          Modify Plan
        </h3>
        <h3
          className={styles.link}
          onClick={() => router.push("/plantsettings")}
        >
          Plant Settings
        </h3>
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
