import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/images/freshcart-logo.svg";
import { TokenContext } from "../Context/TokenContext";
export default function Navbar() {
  let { token, setToken, setOpen } = useContext(TokenContext);

  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }
  console.log(token);
  return (
    <div className=" nav-bg ">
      <nav className="navbar container navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="Products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="Categories">
                      Categories
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="nav-item"
                  >
                    <Link className="nav-link" to="Cart">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="Wish">
                      wish list
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="Brands">
                      Brands
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <button onClick={logOut} className="nav-link">
                      LogOut
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="Login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Register">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
