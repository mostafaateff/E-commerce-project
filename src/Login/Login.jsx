import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TokenContext } from "../Context/TokenContext";
import { Helmet } from "react-helmet";
// import { useQuery } from "react-query";

export default function Login() {
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let { setToken } = useContext(TokenContext);

  async function callLogin(reqBody) {
    console.log(reqBody);
    setErrorMessage("");
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
    console.log(data);
    console.log(data?.user.email);
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userEmail", data?.user.email);
      setToken(data.token);
      navigate("/home");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("email not valid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid passowrd")
      .required("password is required"),
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLogin,
  });

  return (
    <div className=" login  container my-5 ">
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      {errorMessage ? (
        <div className="alert alert-danger ">{errorMessage}</div>
      ) : null}
      <h2 className="fw-bolder my-3 ">login now </h2>
      <form onSubmit={loginForm.handleSubmit}>
        <div className="form-section my-2 ">
          <label className="fw-semibold " htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            name="email"
            id="email"
            className=" form-control "
          />
          {loginForm.errors.email && loginForm.touched.email ? (
            <div className=" alert  alert-danger ">
              {loginForm.errors.email}
            </div>
          ) : null}
        </div>
        <div className="form-section my-2 ">
          <label className="fw-semibold " htmlFor="password">
            Password :
          </label>
          <input
            type="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            name="password"
            id="password"
            className=" form-control "
          />
          {loginForm.errors.password && loginForm.touched.password ? (
            <div className=" alert  alert-danger ">
              {loginForm.errors.password}
            </div>
          ) : null}
        </div>

        <div className="d-flex justify-content-between my-4 ">
          <button
            className="btn bg-main text-white "
            onClick={() => navigate("/ForgetPassword")}
          >
            forget passowrd
          </button>
          <button
            className="btn bg-main text-white "
            disabled={!(loginForm.isValid && loginForm.dirty)}
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
