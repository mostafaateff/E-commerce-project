import React from 'react'
import Bars from "react-spinners/ClipLoader";

export default function Loading() {
    return (
      <div className='loading'> 
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
}
