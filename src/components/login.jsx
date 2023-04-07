import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/login.png";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

export default function Login() {
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
                <div className="offset-lg-2 col-lg-4 col-sm-12">
                  <img src={logo} alt="" width={250} />
                </div>
                <div className="col-lg-4 col-sm-12 ">
                  <div className="border p-5">
                    <h2>Instagram Clone</h2>
                    <div className="mb-3 mt-4">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        class="form-control"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email && "error"}
                      />
                      {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
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
                      <div className="text-center mt-2">
                        <p>OR</p>
                        <p style={{ color: "#385185" }}>
                          <b>Log in with Facebook</b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" border px-5 py-2 my-2">
                    <p>
                      Don't have an account? <Link to="/signup">signUp</Link>
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
