/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { userService } from '../../services';

import styles from "~styles/pages/account/register.module.scss";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const router = useRouter();
    const emailValidation = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(email) === false) {
            setError(true);
            setErrorText("Email is not valid");
            return false;
        }
        return true;
    }

    const register = async () => {
        if (name !== "" && email !== "" && password !== "") {
            if (emailValidation()) {
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                })
                const user = await response.json();
                if(user.status === true){
                    router.push("/account/plan")
                }else{
                    setError(true);
                    setErrorText(user.message)
                }
            }
        } else {
            setError(true);
            setErrorText("Please fill all fields.");
        }
    }

    return (
        <div className={styles.screen}>
            <img className={styles.logo} src={"/assets/logo.png"} alt="logo" />
            <div className={styles.formContainer}>
                <h2>Setup your account.</h2>

                <div className={styles.formDetailsContainer}>
                    <div className={styles.detailsInputsContainer}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.detailsProfilePictureContainer}></div>
                </div>

                <input
                    type="password"
                    className={styles.input}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                    error && (
                        <p className={styles.errorText}>{errorText}</p>
                    )
                }
                <h4><a onClick={() => router.push('/account/login')}>Click here </a> to login.</h4>
            </div>

            <div
                className={styles.nextButtonContainer}
                onClick={() => register()}
            >
                <h5>Next</h5>
            </div>
        </div>
    );
};

export default Register;
