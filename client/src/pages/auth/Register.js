import React from 'react'
import Form from '../../components/shared/Form/Form';
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0" style={{ backgroundColor: "#2e2e2e", color: "white" }}>
          <div className="col-md-8 register-banner">
            <img src="./assets/images/banner2.jpeg" alt="registerImage" />
          </div>
          <div className="col-md-4 form-container" style={{ paddingLeft: "0px", paddingRight: "135px" }}>
            <Form
              formTitle={"Register"}
              submitBtn={"Register"}
              formType={"register"}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Register;
