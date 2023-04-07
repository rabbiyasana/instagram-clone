import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/login.png";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

export default function Soginup() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Logging in", values);
          setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <>
            <div className="Container p-2">
              <div className="row m-5">
                <div className="offset-lg-4 col-lg-4 col-sm-12 ">
                  <div className="border p-5">
                    <h2>Instagram Clone</h2>
                    <p>Sign up to see photos and videos from your friends.</p>
                    <div className="mb-3 mt-4">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        class="form-control"
                        placeholder="Mobile Number or Email Address"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email && "error"}
                      />
                      {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="mb-3 mt-4">
                      <input
                        id="fullName"
                        name="fullname"
                        type="text"
                        class="form-control"
                        placeholder="Full Name"
                        value={values.fullNane}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.fullNane && touched.fullNane && "error"
                        }
                      />
                      {errors.fullNane && touched.fullNane && (
                        <div className="input-feedback">{errors.fullNane}</div>
                      )}
                    </div>
                    <div className="mb-3 mt-4">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.username && touched.username && "error"
                        }
                      />
                      {errors.username && touched.username && (
                        <div className="input-feedback">{errors.username}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        class="form-control"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.password && touched.password && "error"
                        }
                      />
                      {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                      )}
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        class="form-control"
                        disabled={isSubmitting}
                        style={{ backgroundColor: "#4CB5F9", color: "#fff" }}
                      >
                        login
                      </button>
                    </div>
                  </div>
                  <div className=" border px-5 py-2 my-2">
                    <p>
                      Already have an account? <Link to="/">login</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
}
