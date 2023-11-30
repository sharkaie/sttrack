import React, { useEffect, useState } from "react";
import authService from "../services/auth";
import "../style.css";
import { Link } from "react-router-dom";
import SetTitle from "./common/SetTitle";
import validchk from "validator";

const RegisterForm = (props) => {
  useEffect(() => {
    SetTitle("Sign Up");
  }, []);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [validator, setValidator] = useState({
    firstname: "",
    email: "",
    validEmail: "",
    password: "",
    passMin: "",
    confirm_password: "",
    cnfrmMatch: "",
  });

  const formHandle = (event) => {
    const { name, value } = event.target;

    if (
      name === "firstname" ||
      name === "email" ||
      name === "password" ||
      name === "confirm_password"
    ) {
      if (value === "") {
        setValidator((preValue) => {
          return {
            ...preValue,
            [name]: true,
          };
        });
      } else if (value) {
        if (name === "email" && !validchk.isEmail(value)) {
          setValidator((preValue) => {
            return {
              ...preValue,
              validEmail: true,
              [name]: false,
            };
          });
        } else if (name === "email" && validchk.isEmail(value)) {
          setValidator((preValue) => {
            return {
              ...preValue,
              validEmail: false,
              [name]: false,
            };
          });
        } else if (name === "password" && value.length < 4) {
          setValidator((preValue) => {
            return {
              ...preValue,
              passMin: true,
              [name]: false,
            };
          });
        } else if (name === "password" && value.length > 4) {
          setValidator((preValue) => {
            return {
              ...preValue,
              passMin: false,
              [name]: false,
            };
          });
        } else if (name === "confirm_password" && formData.password !== value) {
          setValidator((preValue) => {
            return {
              ...preValue,
              cnfrmMatch: true,
              [name]: false,
            };
          });
        } else if (name === "confirm_password" && formData.password === value) {
          setValidator((preValue) => {
            return {
              ...preValue,
              cnfrmMatch: false,
              [name]: false,
            };
          });
        } else {
          setValidator((preValue) => {
            return {
              ...preValue,
              [name]: false,
            };
          });
        }
      }
    }

    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const createUserResponse = await authService.register(formData);
    if (createUserResponse.status === 200) {
      const login = await authService.login(
        formData.email,
        formData.password
      );

      if (login.status === 200) {
        props.history.replace("/dashboard");

      }
      // console.log('registerd', createUserResponse.data);
    } else {
      console.log("registration failed");
    }

  };

  return (
    <React.Fragment>
      <div className="container-fluid px-0 mx-0 my-auto">
        <div className="row account-page d-flex justify-content-center mx-0 px-0">
          <div className="col-lg-5 col-md-5 col-sm-12 my-auto">
            <div className="card border-0 rounded-1 shadow-lg ">
              <div className="card-body p-4">
                <div className="text-center w-75 m-auto">
                  <h4 className="text-color-grey text-center mt-0 font-weight-bold">
                    Sign Up
                  </h4>
                  <p className="text-muted mb-4">
                    Create an account to use Sttrack
                  </p>
                </div>
                <form onSubmit={handleSignup}>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 mb-3">
                      <label className="form-label">Firstname</label>
                      <input
                        type="text"
                        className={`form-control ${validator.firstname
                            ? "is-invalid"
                            : validator.firstname === false
                              ? "is-valid"
                              : ""
                          }`}
                        name="firstname"
                        value={formData.firstname}
                        onChange={formHandle}
                        placeholder="Enter your Firstname"
                      />
                      {validator.firstname ? (
                        <span className="text-danger">Firstname required</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-lg-6 col-md-6 mb-3">
                      <label className="form-label">Lastname</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        value={formData.lastname}
                        onChange={formHandle}
                        placeholder="Enter your Lastname"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className={`form-control ${validator.email || validator.validEmail
                          ? "is-invalid"
                          : validator.email === false &&
                            validator.validEmail === false
                            ? "is-valid"
                            : ""
                        }`}
                      name="email"
                      value={formData.email}
                      onChange={formHandle}
                      placeholder="Enter your Email"
                    />
                    {validator.email || validator.validEmail ? (
                      <span className="text-danger">
                        {validator.email ? "Email required" : "Invalid Email"}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${validator.password || validator.passMin
                          ? "is-invalid"
                          : validator.password === false &&
                            validator.passMin === false
                            ? "is-valid"
                            : ""
                        }`}
                      name="password"
                      value={formData.password}
                      onChange={formHandle}
                      placeholder="Enter your Password"
                    />
                    {validator.password || validator.passMin ? (
                      <span className="text-danger">
                        {validator.passMin
                          ? "Min Password length is 5"
                          : "Password required"}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-3">
                    <a
                      href="pages-recoverpw.html"
                      className="text-muted float-right"
                    ></a>
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className={`form-control ${validator.confirm_password || validator.cnfrmMatch
                          ? "is-invalid"
                          : validator.confirm_password === false &&
                            validator.cnfrmMatch === false
                            ? "is-valid"
                            : ""
                        }`}
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={formHandle}
                      placeholder="Enter your Confirm Password"
                    />
                    {validator.confirm_password || validator.cnfrmMatch ? (
                      <span className="text-danger">
                        {validator.cnfrmMatch
                          ? "Password did not Match"
                          : "Confirm_password required"}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mb-0 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-0 shadow py-2 px-4"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-sm-12 text-center d-block">
              <p className="text-muted">
                Already have an account?{" "}
                <Link to="/login" className="text-muted ml-1">
                  <b>Log in</b>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegisterForm;
