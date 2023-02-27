/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { userService, planService } from "services";
import GoogleMapReact from 'google-map-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "~styles/pages/account/register.module.scss";

const Plan = () => {
    const [plan, setPlan] = useState({
        userid: "",
        name: "",
        location: "",
        size: "",
        last_frost: new Date(),
        first_frost: new Date()
    });
    const [error, setError] = useState(false);

    const router = useRouter();

    const register = async () => {
        if (plan.name !== "" && plan.location !== "" && plan.size !== "") {
            plan.userid = userService.getId();
            const result = await planService.create(plan)
            if (result.status === true) {
                alert(result.message);
                router.push("/account/payment")
            } else {
                setError(true);
            }
        } else {
            setError(true);
        }
    }

    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
          position: {
            lat: 59.9554,
            lng: 30.337844
          },
          map,
          title: 'Hello World!'
        });
        return marker;
      }
    

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    const [position, setPosition] = useState({
        lat: 59.9554,
        lng: 30.337844
    })


    const changePosition = (e) => {
        console.log(e);
        setPosition({
            lat: e.lat,
            lng: e.lng
        })
    }

    return (
        <div className={styles.screen}>
            <img className={styles.logo} src={"/assets/logo.png"} alt="logo" />
            <div className={styles.formContainer}>
                <h2>Tell us about your plan.</h2>

                <input
                    type="text"
                    className={styles.input}
                    placeholder="Name"
                    value={plan.name}
                    onChange={(e) => {
                        setPlan({
                            ...plan,
                            name: e.target.value,
                        });
                    }}
                />

                <div className={styles.formDetailsContainer}>
                    <div className={styles.detailsInputsContainer}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Location"
                            value={plan.location}
                            onChange={(e) => {
                                setPlan({
                                    ...plan,
                                    location: e.target.value,
                                });
                            }}
                        />
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Size"
                            value={plan.size}
                            onChange={(e) => {
                                setPlan({
                                    ...plan,
                                    size: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.detailsLocationContainer}>
                        <div style={{ height: '150px', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyDZfVO29Iytspv4xz7S68doIoiztiRLhbk" }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                onClick={(e) => changePosition(e)}
                                onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
                                yesIWantToUseGoogleMapApiInternals
                            >
                            </GoogleMapReact>
                        </div>
                    </div>
                </div>

                <DatePicker
                    placeholder="Last Frost date"
                    className={styles.input}
                    selected={plan.last_frost}
                    onChange={(e) => {
                        setPlan({
                            ...plan,
                            last_frost: e,
                        });
                    }}
                />

                <DatePicker
                    placeholder="First Frost date"
                    className={styles.input}
                    selected={plan.first_frost}
                    onChange={(e) => {
                        setPlan({
                            ...plan,
                            first_frost: e,
                        });
                    }}
                />

                {
                    error && (
                        <p className={styles.errorText}>Please fill all fields.</p>
                    )
                }

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

export default Plan;
