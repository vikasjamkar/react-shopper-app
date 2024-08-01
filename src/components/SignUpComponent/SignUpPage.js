import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import register from "../../assets/images/register1.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUpPage.css";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userError, setUserError] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = (values, { resetForm }) => {
    toast.info("👷🏼 Page under in Progress...");
    axios({
      method: "post",
      url: "http://127.0.0.1:2050/register",
      data: values,
    })
      .then(() => {
        toast.success("Register Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
    resetForm();
    setUserError("");
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:2050/customers")
      .then((res) => setUsers(res.data));
  }, []);

  const verifyUsers = (e) => {
    for (let user of users) {
      if (e.target.value === "") {
        setUserError("");
        setErrorColor("");
        break;
      } else if (user.first == e.target.value) {
        setUserError("User is Taken");
        setErrorColor("text-danger");
        break;
      } else {
        setUserError("User  Available");
        setErrorColor("text-success");
      }
    }
  };

  const verifyUser = () => {
    setUserError("");
  };

  return (
    <>
      <section id="RegisterBack">
        <ToastContainer />
        <Formik
          initialValues={{
            first: "",
            last: "",
            email: "",
            password: "",
          }}
          validationSchema={yup.object({
            first: yup.string().required("Enter First Name"),
            last: yup.string().required("Enter Last Name"),
            email: yup
              .string()
              .required("Enter Email Address")
              .email("Invalid Email address"),
            password: yup
              .string()
              .required("Create Password")
              .matches(
                /(?=.*[A-Z])\w{4,15}/,
                "Password 4 to 15 with one uppercase"
              ),
          })}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <div id="form_container">
                <div className="form_left_side">
                  <h5>Sign up | Shopper</h5>
                  <hr />
                  <div className="form_inputs">
                    <div>
                      <label htmlFor="First">First Name</label>
                      <div>
                        <Field
                          type="text"
                          name="first"
                          id="First"
                          style={{
                            border: "1px solid white",
                            outline: "none",
                            background: "transparent",
                            width: "100%",
                            height: "35px",
                          }}
                          onKeyUp={verifyUsers}
                          onBlur={verifyUser}
                        ></Field>
                      </div>
                      <span className="text-danger">
                        <ErrorMessage name="first" />
                      </span>
                      <span className={errorColor}>{userError}</span>
                    </div>

                    <div>
                      <label htmlFor="Last">Last Name</label>
                      <div>
                        <Field
                          type="text"
                          name="last"
                          id="Last"
                          style={{
                            border: "1px solid white",
                            outline: "none",
                            background: "transparent",
                            width: "100%",
                            height: "35px",
                          }}
                        ></Field>
                      </div>
                      <span className="text-danger">
                        <ErrorMessage name="last" />
                      </span>
                    </div>

                    <div>
                      <label htmlFor="Email">Email</label>
                      <div>
                        <Field
                          type="email"
                          name="email"
                          id="Email"
                          style={{
                            border: "1px solid white",
                            outline: "none",
                            background: "transparent",
                            width: "100%",
                            height: "35px",
                          }}
                        ></Field>
                      </div>
                      <span className="text-danger">
                        <ErrorMessage name="email" />
                      </span>
                    </div>

                    <div>
                      <label htmlFor="Password">Password</label>
                      <div>
                        <Field
                          type="password"
                          name="password"
                          id="Password"
                          style={{
                            border: "1px solid white",
                            outline: "none",
                            background: "transparent",
                            width: "100%",
                            height: "35px",
                          }}
                        ></Field>
                      </div>
                      <span className="text-danger">
                        <ErrorMessage name="password" />
                      </span>
                    </div>

                    <div>
                      <button
                        disabled={!props.isValid}
                        className="btn btn-primary w-100"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form_right_side">
                  <img src={register} alt="register" />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default SignUpPage;
