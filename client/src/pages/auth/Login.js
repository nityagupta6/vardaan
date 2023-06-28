import React from 'react';
import Form from '../../components/shared/Form/Form';

const Login = () => {
  return (
    <>
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

    </>
  )
}

export default Login;
