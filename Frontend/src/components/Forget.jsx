import React, { useContext, useState } from "react";
import "../styles/Signinpage.css";
import { userContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Forget() {
  const { register, setRegister } = useContext(userContext);
  const [newpas, setNewpas] = useState("");
  const [repas, setRepas] = useState("");
  const [otp, setOtp] = useState(true);
  const history = useNavigate();
  if (otp) {
    return (
      <div>
        <section className="background-radial-gradient overflow-hidden">
          <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div className="row gx-lg-5 align-items-center mb-5">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-5 fw-bold ls-tight text-light">
                  Reset password task
                </h1>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                <div
                  id="radius-shape-1"
                  className="position-absolute rounded-circle shadow-5-strong"
                ></div>
                <div
                  id="radius-shape-2"
                  className="position-absolute shadow-5-strong"
                ></div>

                <div className="card bg-glass">
                  <div className="card-body px-4 py-5 px-md-5">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        console.log(register);
                        axios.patch(
                          `https://password-reset-gtnv.onrender.com/api/users/${register.email}`
                        );
                        setRegister({
                          email: register.email,
                          name: "",
                          password: "",
                        });
                        setOtp(!otp);
                      }}
                    >
                      <div className="row">
                        <label className="form-label" htmlFor="form3Example3">
                          Email address
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form3Example3"
                            className="form-control"
                            value={register.email}
                            required
                            onChange={(e) => {
                              setRegister({
                                ...register,
                                email: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Send OTP
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div>
        <section className="background-radial-gradient overflow-hidden">
          <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div className="row gx-lg-5 align-items-center mb-5">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-5 fw-bold ls-tight text-light">
                  Reset password task
                </h1>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                <div
                  id="radius-shape-1"
                  className="position-absolute rounded-circle shadow-5-strong"
                ></div>
                <div
                  id="radius-shape-2"
                  className="position-absolute shadow-5-strong"
                ></div>

                <div className="card bg-glass">
                  <div className="card-body px-4 py-5 px-md-5">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (newpas === repas) {
                          axios.patch(
                            `https://password-reset-gtnv.onrender.com/api/users/${register.email}/${register.password}/${newpas}`
                          );
                          setRegister({
                            email: "",
                            name: "",
                            password: "",
                          });
                          setNewpas("");
                          setRepas("");
                          history("/Welcome");
                        } else {
                          window.alert("Both Password must be same");
                        }
                      }}
                    >
                      <div className="row">
                        <label className="form-label" htmlFor="form3Example3">
                          Enter OTP
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form3Example3"
                            className="form-control"
                            value={register.password}
                            required
                            onChange={(e) => {
                              setRegister({
                                ...register,
                                password: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form3Example4">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="form3Example4"
                            className="form-control"
                            value={newpas}
                            required
                            onChange={(e) => {
                              setNewpas(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form3Example4">
                            Re-type Password
                          </label>
                          <input
                            type="password"
                            id="form3Example4"
                            className="form-control"
                            value={repas}
                            required
                            onChange={(e) => {
                              setRepas(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <button className="btn btn-primary btn-block mb-4">
                        submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Forget;
