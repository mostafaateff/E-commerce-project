import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";

export default function ForgetPassword() {

  let navigate = useNavigate()

  async function forgetPassword() {
      console.log(email);
      
   let data = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        email,
      }
      );
      console.log(data);
  }

  const [email, setemail] = useState("");

    return (
        <>
            <Helmet>
                <title>Forget Password</title>
            </Helmet>
        <div className=" forget-form container my-5 ">
          <label className="fw-bolder h3" htmlFor="email">
            Please enter your Email
          </label>
          <input
            id="email"
            onChange={(e) => setemail(e.target.value)}
            type="email"
            className=" form-control w-100 my-3 "
          />
          <button
            disabled={!email}
            className="btn btn-border"
                    onClick={() => { forgetPassword() ; navigate("/VerifyCode"); }  }
          >
            verify
          </button>
        </div>
      </>
    );
}
