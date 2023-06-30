import React from 'react';
import Form from '../../components/shared/Form/Form';
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Login = () => {
  const{loading,error}=useSelector((state)=>state.auth);
  return (
    <>
    {error && <span>{alert(error)}</span>}
    {loading ? (
        <Spinner/>
      ):(
        <div className="row">
        <div className="col-md-8 login-banner">
          <img src="./assets/images/banner1.jpeg" alt="loginImage" />
        </div>
        <div className="col-md-4 form-container">
          <Form
            formTitle={"Login Page"}
            submitBtn={"Login"}
            formType={"login"}
          />
        </div>
      </div>
    )}
    </>
  )
}

export default Login;
