import React, { useState } from "react";
import authService from "../services/auth";
import "../style.css";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember_me: false,
  });
  const [invalidAlert, setInvalidAlert] = useState(false);

  const remember_meHandler = (event) => {
    setFormData((preValue) => {
      return {
        ...preValue,
        remember_me: event.target.checked,
      };
    });
  };

  const formHandle = (event) => {
    const { name, value } = event.target;
    setInvalidAlert(false);
    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await authService.login(formData.email, formData.password);

    if (response.status === 200) {
      props.history.replace("/dashboard");
    } else {
      setInvalidAlert(true);
    }
  };

  return (
    <React.Fragment>
      <div className="container px-0">
        <div className="row account-page justify-content-center px-0 mx-0" >
          <div className="col-lg-5 my-auto">
            <div className="card border-0 rounded-1 shadow-lg ">
              <div className="card-body p-4">
                <div className="text-center w-75 m-auto">
                  <h4 className="text-color-grey text-center mt-0 font-weight-bold">
                    Sign In
                  </h4>
                  <p className="text-muted mb-4">Welcome to Sttrack</p>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={formHandle}
                      placeholder="Enter your Email"
                    />
                    {invalidAlert ? (
                      <span className="text-danger">Invalid Credentials</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-3">
                    <a
                      href="pages-recoverpw.html"
                      className="text-muted float-right"
                    >
                      <small>Forgot your password?</small>
                    </a>
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={formHandle}
                      placeholder="Enter your Password"
                    />
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rmb_checkbox"
                      name="remember_me"
                      defaultChecked={false}
                      onChange={remember_meHandler}
                    />
                    <label className="form-check-label" htmlFor="rmb_checkbox">
                      Remember me
                    </label>
                  </div>
                  <div className="form-group mb-0 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-0 shadow py-2 px-4"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 text-center">
                <p className="text-muted">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-muted ml-1">
                    <b>Sign Up</b>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer footer-login footer-alt">
        {new Date().getFullYear()} © Sttrack - Simplly simple, All Rights
        Reserved.
      </footer>
    </React.Fragment>
  );
};

export default LoginForm;
