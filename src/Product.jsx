import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addProductToCart, addProductToWishList, useCartCrud } from "./useCart";

export function Product({ prod }) {
  const { mutate } = useCartCrud(addProductToCart);
  const { mutate: wishMutate } = useCartCrud(addProductToWishList);
  const [heart, setHeart] = useState(false);

  return (
    <div className="col-md-3 ">
      <div className="product p-3">
        <i
          onClick={() => {
            setHeart(!heart);
            wishMutate(prod._id);
          }}
          class="fa-solid fa-heart cursor-pointer"
          style={heart ? { color: "green" } : { color: "unset" }}
        ></i>
        <Link to={`/ProductDetails/${prod._id}`}>
          <img src={prod.imageCover} className="w-100" alt="" />
          <p className="text-main">{prod.category.name}</p>
          <p>{prod.title}</p>
          <div className=" d-flex  justify-content-between ">
            <p>{prod.price} EGB</p>
            <div>
              <i class="fa-solid fa-star rating-color"></i>
              {prod.ratingsAverage}
            </div>
          </div>
        </Link>
        <button
          onClick={() => {
            mutate(prod._id);
          }}
          className="btn btn-border m-2 "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
