import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { TokenContext } from "../Context/TokenContext";
import {
  checkOut,
  clearCart,
  getCart,
  removeItem,
  updateCount,
  useCartCrud,
  useCartGet,
} from "../useCart";

import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  let navigate = useNavigate();

  let { isOpen, setOpen } = useContext(TokenContext);

  let { mutate } = useCartCrud(removeItem);

  let { mutate: clearMutate } = useCartCrud(clearCart);

  let { mutate: updatemutate } = useCartCrud(updateCount);

  let { mutate: chechkmutate, data: checkdata } = useCartCrud(checkOut);

  let [details, setdetails] = useState("");
  let [phone, setphone] = useState("");
  let [city, setcity] = useState("");

  let { data, isLoading, isError, error } = useCartGet("getcart", getCart);

  if (isLoading) return <Loading />;

  if (isError) return <h2>{error.message}</h2>;

  console.log(data);

  function addAdrre(e) {
    e.preventDefault();
    let shippingAddress = { details, phone, city };
    chechkmutate({ id: data?.data?.data?._id, shippingAddress });
    window.location = checkdata.data.session.url;
  }
  // console.log(checkdata.data.session.url);

  return (
    <div className="cart">
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      <aside
        className="right"
        style={
          isOpen
            ? { right: 0, transition: "right 1s" }
            : { right: "-100%", transition: "right 1s" }
        }
      >
        <i
          className="fa-solid fa-circle-xmark m-3 cursor-pointer "
          onClick={() => {
            setOpen(false);
          }}
        ></i>

        {data?.data.numOfCartItems ? (
          <>
            <div className="container  ">
              <div className="row  ">
                <h3 className="text-main">
                  Number Of Cart items : {data?.data.numOfCartItems}
                </h3>
                <p className="text-main">
                  Total Cart Price : {data?.data?.data.totalCartPrice} EGP
                </p>
                {data?.data?.data.products.map((prod) => (
                  <div className="row gy-3 ">
                    <div className="col-1">
                      <img
                        src={prod.product.imageCover}
                        className="w-100 "
                        alt=""
                      />
                    </div>
                    <div className="col-11 d-flex  justify-content-between ">
                      <div className="title  ">
                        <p className="my-1 ">{prod.product.title}</p>
                        <p className=" my-1 text-main ">Price : {prod.price}</p>
                        <i class="fa-solid fa-trash-can text-main cursor-pointer "></i>{" "}
                        <span
                          onClick={() => mutate(prod.product._id)}
                          className="cursor-pointer"
                        >
                          Remove
                        </span>
                      </div>
                      <div className="count d-flex  justify-content-center   align-items-center ">
                        <p
                          onClick={() =>
                            updatemutate({
                              id: prod.product._id,
                              count: prod.count + 1,
                            })
                          }
                          className="  plus-border px-2 py-1 rounded-2 cursor-pointer"
                        >
                          +
                        </p>
                        <p className="mx-3">{prod.count}</p>
                        <p
                          onClick={() =>
                            updatemutate({
                              id: prod.product._id,
                              count: prod.count - 1,
                            })
                          }
                          className="  plus-border px-2 py-1 rounded-2 cursor-pointer "
                        >
                          -
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-danger my-4 "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                checkout
              </button>
            </div>
            <hr />
            <div className=" d-flex  justify-content-center my-3">
              <button
                onClick={() => {
                  clearMutate(); navigate('/home');
                }}
                className="btn btn-border px-3 py-2  "
              >
                clear your cart
              </button>
            </div>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form action="">
                      <input
                        type="text"
                        className=" form-control "
                        placeholder="details"
                        onChange={(e) => {
                          setdetails(e.target.value);
                        }}
                      />
                      <input
                        type="text"
                        className=" form-control "
                        placeholder="phone"
                        onChange={(e) => {
                          setphone(e.target.value);
                        }}
                      />
                      <input
                        type="text"
                        className=" form-control "
                        placeholder="city"
                        onChange={(e) => {
                          setcity(e.target.value);
                        }}
                      />
                      <button
                        type="submit"
                        className="btn btn-success my-3 "
                        onClick={addAdrre}
                      >
                        submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-main text-center">Cart Is Empty</h2>
        )}
      </aside>
    </div>
  );
}
