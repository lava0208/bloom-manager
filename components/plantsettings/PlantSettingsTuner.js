import React, { useState } from "react";

import styles from "~styles/components/plantsettings/plantsettingstuner.module.scss";

const PlantSettingsTuner = () => {
  const [userSettings, setUserSettings] = useState({
    lastFrost: "",
    firstFrost: "",
    location: "",
    hardenTime: "",
  });

  return (
    <div className={styles.container}>
      {/* User Settings */}
      <div className={styles.userSettingsContainer}>
        <div className={styles.userSettingsPaper}>
          <div className={styles.userSettingsOptionsContainer}>
            <h2>User Settings</h2>
            <div className={styles.userSettingsInputRow}>
              <h3>Last Frost</h3>
              <input
                type="text"
                value={userSettings.lastFrost}
                onChange={(e) => {
                  setUserSettings({
                    ...userSettings,
                    lastFrost: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.userSettingsInputRow}>
              <h3>First Frost</h3>
              <input
                type="text"
                value={userSettings.firstFrost}
                onChange={(e) => {
                  setUserSettings({
                    ...userSettings,
                    firstFrost: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.userSettingsInputRow}>
              <h3>Location</h3>
              <input
                type="text"
                value={userSettings.location}
                onChange={(e) => {
                  setUserSettings({
                    ...userSettings,
                    location: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.userSettingsInputRow}>
              <h3>Harden Time</h3>
              <input
                type="text"
                value={userSettings.hardenTime}
                onChange={(e) => {
                  setUserSettings({
                    ...userSettings,
                    hardenTime: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <button className={styles.settingsButton}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default PlantSettingsTuner;
