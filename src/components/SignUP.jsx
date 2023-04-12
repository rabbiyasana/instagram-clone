import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate } from "react-router-dom";
import React from "react";
import { useFormik } from "formik";
import { useAuth } from "../context/authContetxt";

import * as Yup from "yup";

const schema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Required"),
});

export default function Signup() {
  const { loggedIn, setLoggedIn } = useAuth();
  const { errors, handleChange, handleSubmit, touched, values } = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      password: "",
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      localStorage.setItem("fullname", values.fullname);
      localStorage.setItem("username", values.username);
      localStorage.setItem("password", values.password);
      localStorage.setItem("email", values.email);
      localStorage.setItem("isRegistered", true);

      console.log(values);
    },
  });
  if (loggedIn === true) {
    return <Navigate to="/home" replace={true}></Navigate>;
  }
  return (
    <div className="Container p-2">
      <div className="row m-5">
        <div className="offset-lg-4 col-lg-4 col-sm-12 ">
          <div className="border p-5">
            <h2>Instagram Clone</h2>
            <p>Sign up to see photos and videos from your friends.</p>

            {/* {({ errors, touched }) => ( */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-4">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={values.fufullname}
                  onChange={handleChange}
                />
                {errors.fullname && touched.fullname ? (
                  <div>{errors.fullName}</div>
                ) : null}
              </div>
              <div className="mb-3 mt-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.fullname && touched.fullname ? (
                  <div>{errors.fullName}</div>
                ) : null}
              </div>
              <div className="mb-3 mt-4">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="form-control"
                  style={{ backgroundColor: "#4CB5F9", color: "#fff" }}
                >
                  login
                </button>
              </div>
            </form>
            {/* )} */}
          </div>
          <div className=" border px-5 py-2 my-2">
            <p>
              Already have an account? <Link to="/">SignUp</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
