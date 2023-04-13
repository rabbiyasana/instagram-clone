import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/login.png";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContetxt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string().required("Password is a required field"),
});

export default function Login() {
  const { loggedIn, setLoggedIn } = useAuth();
  let navigate = useNavigate();
  const successNotify = () =>
    toast.success("Logging In", {
      position: toast.POSITION.TOP_CENTER,
    });
  const { errors, handleChange, handleSubmit, touched, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      let emailStored = localStorage.getItem("email");
      let passwordStored = localStorage.getItem("password");

      if (values.email === emailStored && values.password === passwordStored) {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", JSON.stringify(true));
      }
    },
  });
  if (loggedIn === true) {
    successNotify();
    return <Navigate to="/home" replace={true}></Navigate>;
  }

  return (
    <>
      <div className="Container p-2">
        <div className="row m-5">
          <div className="offset-lg-2 col-lg-4 .d-md-none col-sm-12">
            <img src={logo} alt="" width={250} />
          </div>
          <div className="col-lg-4 col-sm-12 ">
            <div className="border p-5">
              <form onSubmit={handleSubmit}>
                <h2>Instagram Clone</h2>
                <div className="mb-3 mt-4">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
                  <p className="error">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>
                <div className="mb-3">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
                  <ToastContainer />
                  <p className="error">
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="form-control"
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
              </form>
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
}
