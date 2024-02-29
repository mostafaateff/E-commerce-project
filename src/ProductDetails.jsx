import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { addProductToCart, useCartCrud } from "./useCart";

export default function ProductDetails() {

  const { mutate } = useCartCrud(addProductToCart);

  let { id } = useParams();

  console.log(id);

  async function singleProductDetails(id) {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  const { isError, data, isLoading, error } = useQuery(
    "singleProduct",
    () => singleProductDetails(id),
    {
      select: (data) => data?.data?.data,
    }
  );

  if (isLoading) return <Loading />;

  if (isError) return <h2>{error.message}</h2>;

  console.log(data);

  
  return (
    <div className="container py-5 ">
      <div className="row align-items-center  ">
        <div className="col-md-4">
          <img src={data.imageCover} className="w-100" alt="" />
        </div>
        <div className="col-md-8">
          <h4>{data.description}</h4>
          <p>{data.title}</p>
          <p className=" fw-bold ">{data.category.name}</p>
          <div className="d-flex justify-content-between ">
            <p className=" fw-bold ">{data.price} EGB</p>
            <div>
              <i class="fa-solid fa-star rating-color"></i>
              {data.ratingsAverage}
            </div>
          </div>
          <button onClick={()=>{mutate(data._id)}} className=" w-100 btn bg-main text-white ">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
