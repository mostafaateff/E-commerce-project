import axios from 'axios';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';

export default function VerifyCode() {

async function verifyCode() {
  console.log(resetCode);
  let data = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    {
      resetCode,
    }
  );
    console.log(data);
    }
    
const [resetCode,setResetCode] = useState()

  return (
    <>
      <Helmet>
        <title>verify-code</title>
      </Helmet>
      <div className=" verify-form container my-5 ">
        <label className="fw-bolder h3" htmlFor="code">
          reset your account password
        </label>
        <input
          id="code"
          onChange={(e) => setResetCode(e.target.value)}
          type="text"
          className=" form-control w-100 my-3 "
        />
        <button
                  className="btn btn-border"
                  onClick={verifyCode}
        >
          verify
              </button>
      </div>
    </>
  );
}
