import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("donar");
    const [name, setName] = useState("");
    //const [organisationName, setOrganisationName] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    return (
        <div>
            <form
                onSubmit={(e) => {
                    if (formType === "login")
                        handleLogin(e, email, password, role);
                    else if (formType === "register")
                        handleRegister(
                            e,
                            name,
                            role,
                            email,
                            password,
                            phone,
                            //organisationName,
                            address,
                            hospitalName,
                            website
                        );
                }}
            >
                <h1 className="text-center">{formTitle}</h1>
                <hr />
                <div className="d-flex mb-3">
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="role"
                            id="donarRadio"
                            value={"donar"}
                            onChange={(e) => setRole(e.target.value)}
                            defaultChecked
                        />
                        <label htmlFor="adminRadio" className="form-check-label">
                            Donor
                        </label>
                    </div>
                    <div className="form-check ms-2">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="role"
                            id="adminRadio"
                            value={"admin"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor="adminRadio" className="form-check-label">
                            Admin
                        </label>
                    </div>
                    <div className="form-check ms-2">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="role"
                            id="hospitalRadio"
                            value={"hospital"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor="hospitalRadio" className="form-check-label">
                            Hospital
                        </label>
                    </div>
                    {/* <div className="form-check ms-2">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="role"
                            id="organisationRadio"
                            value={"organisation"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor="organisationRadio" className="form-check-label">
                            Organisation
                        </label>
                    </div> */}
                </div>
                {/* switch statement */}
                {
                    (() => {
                        //eslint-disable-next-line
                        switch (true) {
                            case formType === "login": {
                                return (
                                    <>
                                        <InputType
                                            labelText={"Email"}
                                            labelFor={"forEmail"}
                                            inputType={"email"}
                                            name={"email"}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <InputType
                                            labelText={"Password"}
                                            labelFor={"forPassword"}
                                            inputType={"password"}
                                            name={"password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </>
                                );
                            }
                            case formType === "register": {
                                return (
                                    <>
                                        {(role === "admin" || role === "donar") && (
                                            <InputType
                                                labelText={"Name"}
                                                labelFor={"forName"}
                                                inputType={"text"}
                                                name={"name"}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        )}
                                        {/* {role === "organisation" && (
                                        <InputType
                                            labelText={"Organisation Name"}
                                            labelFor={"fororganisationName"}
                                            inputType={"text"}
                                            name={"organisationName"}
                                            value={organisationName}
                                            onChange={(e) => setOrganisationName(e.target.value)}
                                        />
                                    )} */}
                                        {role === "hospital" && (
                                            <InputType
                                                labelText={"Hospital Name"}
                                                labelFor={"forHospitalName"}
                                                inputType={"text"}
                                                name={"hospitalName"}
                                                value={hospitalName}
                                                onChange={(e) => setHospitalName(e.target.value)}
                                            />
                                        )}

                                        <InputType
                                            labelText={"Email"}
                                            labelFor={"forEmail"}
                                            inputType={"email"}
                                            name={"email"}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <InputType
                                            labelText={"Password"}
                                            labelFor={"forPassword"}
                                            inputType={"password"}
                                            name={"password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputType
                                            labelText={"Website"}
                                            labelFor={"forWebsite"}
                                            inputType={"text"}
                                            name={"website"}
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                        />
                                        <InputType
                                            labelText={"Address"}
                                            labelFor={"forAddress"}
                                            inputType={"text"}
                                            name={"address"}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <InputType
                                            labelText={"Phone"}
                                            labelFor={"forPhone"}
                                            inputType={"text"}
                                            name={"phone"}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </>
                                );
                            }
                        }
                    })()
                }

                <div className="d-flex flex-row justify-content-between">
                    {formType === "login" ? (
                        <p>
                            Not registered yet? Register&nbsp;
                            <Link to="/register" style={{ color: "#C52C28" }}>Here!</Link>
                            <br />
                        </p>
                    ) : (
                        <p>
                            Already a user, Please&nbsp;
                            <Link to="/login" style={{ color: "#C52C28" }}>Login!</Link>
                        </p>
                    )}
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <button class="btn btn-outline-danger btn" style={{ borderRadius: "20px", marginTop: "6px" }} type="submit">
                        {submitBtn}
                    </button>
                </div>
            </form >
        </div >
    );
};

export default Form;