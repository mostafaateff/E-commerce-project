import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function callRegister(reqBody) {
    console.log(reqBody);
    setErrorMessage("");
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
    console.log(data);
    if (data.message === "success") {
      navigate("/Login");
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name is too short")
      .max(10, "name is too long")
      .required("name is required"),
    email: Yup.string().email("email not valid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid passowrd")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword should be match")
      .required("rePassword is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone")
      .required("phone is required"),
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: callRegister,
  });

  return (
    <div className=" register-form register w-75 mx-auto my-5">
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      {errorMessage ? (
        <div className="alert alert-danger ">{errorMessage}</div>
      ) : null}
      <h2 className="fw-bolder my-4">Register Now </h2>
      <form onSubmit={registerForm.handleSubmit}>
        <div className="form-section my-2 ">
          <label className=" fw-semibold " htmlFor="name">
            Name :
          </label>
          <input
            type="text"
            value={registerForm.values.name}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            name="name"
            id="name"
            className=" form-control "
          />
          {registerForm.errors.name && registerForm.touched.name ? (
            <div className=" alert  alert-danger ">
              {registerForm.errors.name}
            </div>
          ) : null}
        </div>
        <div className="form-section my-2 ">
          <label className=" fw-semibold " htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            name="email"
            id="email"
            className=" form-control "
          />
          {registerForm.errors.email && registerForm.touched.email ? (
            <div className=" alert  alert-danger ">
              {registerForm.errors.email}
            </div>
          ) : null}
        </div>
        <div className="form-section my-2 ">
          <label className=" fw-semibold " htmlFor="password">
            Password :
          </label>
          <input
            type="password"
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            name="password"
            id="password"
            className=" form-control "
          />
          {registerForm.errors.password && registerForm.touched.password ? (
            <div className=" alert  alert-danger ">
              {registerForm.errors.password}
            </div>
          ) : null}
        </div>
        <div className="form-section my-2 ">
          <label className=" fw-semibold " htmlFor="rePassword">
            Re-password :
          </label>
          <input
            type="password"
            value={registerForm.values.rePassword}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            name="rePassword"
            id="rePassword"
            className=" form-control "
          />
          {registerForm.errors.rePassword && registerForm.touched.rePassword ? (
            <div className=" alert  alert-danger ">
              {registerForm.errors.rePassword}
            </div>
          ) : null}
        </div>
        <div className="form-section my-2 ">
          <label className=" fw-semibold " htmlFor="phone">
            Phone :
          </label>
          <input
            type="tel"
            value={registerForm.values.phone}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            name="phone"
            id="phone"
            className=" form-control "
          />
          {registerForm.errors.phone && registerForm.touched.phone ? (
            <div className=" alert  alert-danger ">
              {registerForm.errors.phone}
            </div>
          ) : null}
        </div>
        <button
          className="btn my-3  bg-main text-white ms-auto d-block"
          disabled={!(registerForm.isValid && registerForm.dirty)}
        >
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
        </button>
      </form>
    </div>
  );
}
