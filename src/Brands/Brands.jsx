import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

export default function Brands() {
  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, refetch } = useQuery("brands", getBrands, {
    select: (data) => data?.data.data,
    enabled: false,
  });

  console.log(data);

  return (
    <div>
      <Helmet>
        <title>Brands Page</title>
      </Helmet>
      <div className=" brands container">
        <button
          onClick={() => refetch()}
          className="mt-5 btn btn-border position-relative  start-50  translate-middle-x  "
        >
          Click here to show our brands
        </button>
        <div className="row g-3 my-4 ">
          {data?.map((ele) => (
            <div className=" col-md-3 ">
              <div className="border border-1  rounded-3 ">
                <img src={ele.image} className="w-100" alt="" />
                <h3 className="text-center">{ele.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
