import React from "react";
import {
    addProductToCart,
  getUserWishList,
  removeWishItem,
  useCartCrud,
  useCartGet,
} from "../useCart";
import Loading from "../Loading";
import { Helmet } from "react-helmet";

export default function WishList() {


    let { mutate } = useCartCrud(removeWishItem);
    
    const { mutate:addMutate } = useCartCrud(addProductToCart);

  let { data, isLoading, isError, error } = useCartGet(
    "userWishList",
    getUserWishList
  );

  if (isLoading) return <Loading />;

  if (isError) return <h2>{error.message}</h2>;

  console.log(data?.data?.data);

    return (
      <div className="wishlist">
        <Helmet>
          <title>Wish list Page</title>
        </Helmet>
        <div>
          <div className="container nav-bg my-5 p-5  ">
            <h3 className="fw-bold">My wish List</h3>
            <div className="row ">
              {data?.data?.data.map((prod) => (
                <div className="row gy-3  ">
                  <div className="col-1">
                    <img src={prod.imageCover} className="w-100 " alt="" />
                  </div>
                  <div className="col-11 d-flex  justify-content-between align-items-center  ">
                    <div className="title  ">
                      <p className="my-1 ">{prod.title}</p>
                      <p className=" my-1 text-main ">Price : {prod.price}</p>
                      <i class="fa-solid fa-trash-can text-main cursor-pointer "></i>{" "}
                      <span
                        onClick={() => mutate(prod._id)}
                        className="cursor-pointer"
                      >
                        Remove
                      </span>
                    </div>
                    <div>
                      <button className="btn btn-border" onClick={()=> {
                        addMutate(prod._id);mutate(prod._id);
                      } }>Add To Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}
