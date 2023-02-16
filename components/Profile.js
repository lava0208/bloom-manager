/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";

import styles from "~styles/pages/profile.module.scss";
import { userService } from "services";

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        email_newsletter: false,
        share_custom_varieties: false
    });
    const [isPro, setIsPro] = useState(false);

    const [originPassword, setOriginPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        getUserPlan();
    }, [])

    const getUserPlan = async () => {
        const user = await userService.getById(userService.getId());
        console.log(user);
        if(user.data !== null){
            setOriginPassword(user.data.password);
            setUser(user.data);
        }
    }
    
    const saveUser = () => {
        bcrypt.compare(user.password, "$2a$10$fwhzEh5KNdIx9mhz99B7eug/wh8iFye8wXKbygh7rOrYDq633UlUS", async function (err, isMatch) {
            // console.log(user.password);
            // console.log(originPassword);
            if (err, user.password === "") {
                setErrMsg("Fill all fields");
            } else if (!isMatch) {
                setErrMsg("Use correct password.");
            } else {
                alert("here")
                setErrMsg(" ");
                await fetch("/api/auth/user?id=" + window.userid, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user),
                })
            }
        });
    }

    return (<>
        <h2 className={styles.subHeader}>Hello, {user.name}</h2>
        <div className={styles.profilesContainer}>
            <div className={styles.profileContainer}>
                <div className={styles.profileImage}></div>
                <h3>Change Photo</h3>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                    />
                    { 
                        errMsg && (
                            <p className={styles.errorText}>{errMsg}</p>
                        )
                    }
                    <button className={styles.button1} onClick={() => saveUser()}>Save Changes</button>
                </div>
                <div className={styles.preferenceContainer}>
                    <h3>Preferences</h3>
                    <div className={styles.flexContainers}>
                        <div className={styles.flexContainer}>
                            <input
                                type="checkbox"
                                id="emailNewsletter"
                                value={user.email_newsletter}
                                checked={user.email_newsletter}
                                onChange={(e) =>
                                    saveUser({ ...user, email_newsletter: e.target.value })
                                }
                            />
                            <label htmlFor="emailNewsletter">Email Newsletter</label>                        
                        </div>
                        <div className={styles.flexContainer}>
                            <input
                                type="checkbox"
                                id="shareCustomVarieties"
                                value={user.share_custom_varieties}
                                checked={user.share_custom_varieties}
                                onChange={(e) =>
                                    saveUser({ ...user, share_custom_varieties: e.target.value })
                                }
                            />
                            <label htmlFor="shareCustomVarieties">Share Custom Varieties</label>                        
                        </div>
                        <button className={styles.button1}>Save Changes</button>
                    </div>
                </div>
                <button className={styles.button2} onClick={() => router.push("/account/login")}>Close Account</button>
            </div>
            <div className={styles.profileContainer}>
                {
                    !isPro && (
                        <>
                            <h2>Upgrade to PRO</h2>
                            <h1>$5</h1>
                            <h5>per month</h5>
                        </>
                    )
                }                
                <div className={styles.proContainer}>
                    <img src={"/assets/payment-pro.png"} alt="core" />
                    <h3>PRO Benefits</h3>
                    <div className={styles.benefitContainer}>
                        <h4>UNLIMITED Custom Varieties</h4>
                        <h4>PRIORITY Support</h4>
                        <h4>ACCESS to Variety Presets</h4>
                        <h4>UNLIMITED Season Plans</h4>
                    </div>
                </div>
                {
                    isPro ? (
                        <button className={styles.button3 + " " + styles.button4}>Access Priority Support</button>                        
                    ) : (
                        <button className={styles.button3} onClick={() => setIsPro(true)}>Upgrade Now</button>
                    )
                }                
                <button className={styles.button2} onClick={() => setIsPro(false)}>Cancel PRO</button>
            </div>
        </div>
        </>
    );
};

export default Profile;
