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
      {/* Plant Settings */}
      <div className={styles.plantSettingsContainer}>
        <div className={styles.plantSettingsPaper}>
          <div className={styles.plantSettingsColumn}>
            <div className={styles.plantSettingsRow}>
              <h3>Name</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Species</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Earliest Seed</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Latest Seed</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Harden</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Transplant</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Maturity</h3>
              <input type="text" />
            </div>
          </div>
          <div className={styles.plantSettingsColumn}>
            <div className={styles.plantSettingsRow}>
              <h3>Light</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Depth</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Direct Sow</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Seed Note</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Transplant Note</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Harvest Note</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Pinch Note</h3>
              <input type="text" />
            </div>
          </div>
          <div className={styles.plantSettingsColumn}>
            <div className={styles.plantSettingsRow}>
              <h3>Pinch</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Harvest Length</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsRow}>
              <h3>Potting On</h3>
              <input type="text" />
            </div>
            <div className={styles.plantSettingsImage}></div>
          </div>
        </div>
        <div className={styles.settingsButtonContainer}>
          <button className={styles.settingsButton}>Save</button>
          <button className={styles.settingsButton}>Reset</button>
        </div>
      </div>

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
