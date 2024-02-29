import React from "react";
import img1 from "../Assets/images/Amazon_Pay-Logo.wine.svg";
import img2 from "../Assets/images/kisspng-american-express-credit-card-mastercard-visa-payme-american-express-one-5b24ade5099a38.8409761415291304690393.png";
import img3 from "../Assets/images/kisspng-logo-mastercard-vector-graphics-font-visa-mastercard-logo-png-photo-png-arts-5b63429907fe99.1131615315332317690328.png";
import img4 from "../Assets/images/paypal-seeklogo.svg";
import img5 from "../Assets/images/Download on the App Store.svg";
import img6 from "../Assets/images/Google_Play-Logo.wine.svg";

export default function Footer() {
  return (
    <footer className=" bg-main-light py-5 mt-5 ">
      <div className="container">
        <p className=" fw-bold ">Get the FreshCart app</p>
        <p>
          We will send you a link , open it on your phone to download the app.
        </p>
        <div className="footer-form d-flex  justify-content-between ">
          <input type="text" className="form-control " placeholder="Email .." />
          <button className="btn btn-success   ">Share App Link</button>
        </div>
        <hr />
        <div className="  d-flex justify-content-between ">
          <div
            className=" d-flex  align-items-center "
            style={{ width: "50%" }}
          >
            <p className=" mt-2 fw-bold ">Payment Partners</p>
            <img src={img1} className="mx-2" style={{ width: "10%" }} alt="" />
            <img src={img2} className="mx-2" style={{ width: "10%" }} alt="" />
            <img src={img3} className="mx-2" style={{ width: "10%" }} alt="" />
            <img src={img4} className="mx-2" style={{ width: "10%" }} alt="" />
          </div>
          <div
            className="d-flex align-items-center ps-4 "
            style={{ width: "40%" }}
          >
            <p className=" mt-2 fw-bold ">Get deliveries with FreshCart</p>
            <img src={img5} style={{ width: "22%" }} alt="" />
            <img src={img6} style={{ width: "22%" }} alt="" />
          </div>
        </div>
        <hr />
      </div>
    </footer>
  );
}
