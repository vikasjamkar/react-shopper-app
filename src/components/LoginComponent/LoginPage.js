import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import img from "../../assets/images/newLogin.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (values, { resetForm }) => {
    toast.info("👷🏼 Page under in Progress..");
    const req = {
      email: values.email,
      password: values.Password,
    };
    axios
      .post("http://127.0.0.1:2050/login", req)
      .then((response) => {
        if (response.data.length > 0) {
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("customerInfo", JSON.stringify(response.data));
          navigate("/");
        } else {
          toast.error("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    resetForm();
  };
  return (
    <section id="LoginBack">
      <ToastContainer />
      <Formik
        initialValues={{
          email: "",
          Password: "",
        }}
        validationSchema={yup.object({
          email: yup.string().required("Enter Username"),
          Password: yup.string().required("Enter Password"),
        })}
        onSubmit={handleLogin}
      >
        {(props) => (
          <Form style={{ borderRadius: "15px" }}>
            <div id="form_login">
              <div className="form_login_left">
                <div>
                  <h4>Sign In | Shopper</h4>
                  <hr />
                </div>

                <dl>
                  <dt style={{ fontWeight: "100" }}>Username</dt>
                  <dd>
                    <Field
                      type="text"
                      name="email"
                      style={{
                        border: "1px solid lightgrey",
                        outline: "none",
                        background: "transparent",
                        borderRadius: "6px",
                        height: "35px",
                        width: "100%",
                      }}
                    ></Field>
                  </dd>
                  <dd className="text-danger">
                    <ErrorMessage name="email" />
                  </dd>
                  <dt style={{ fontWeight: "100" }}>Password</dt>
                  <dd>
                    <Field
                      type="password"
                      name="Password"
                      style={{
                        border: "1px solid lightgrey",
                        outline: "none",
                        background: "transparent",
                        borderRadius: "6px",
                        height: "35px",
                        width: "100%",
                      }}
                    ></Field>
                  </dd>
                  <dd className="text-danger">
                    <ErrorMessage name="Password" />
                  </dd>
                  <dd>
                    <button
                      className="btn btn-primary w-100 mt-3"
                      disabled={!props.isValid}
                    >
                      Login
                    </button>
                  </dd>
                  <dd className="text-center mt-3">
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      New Register ?
                    </Link>
                  </dd>
                </dl>
              </div>
              <div className="form_login_right">
                <img src={img} alt="login" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default LoginPage;
