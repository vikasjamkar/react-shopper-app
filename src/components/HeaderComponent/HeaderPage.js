import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/shopperlogo.png";
import profile from "../../assets/images/memo_34.png";
import "./HeaderPage.css";
import { clearCart } from "../../store/CartSlice";
import NavbarPage from "../NavbarComponent/NavbarPage";
import mobiles from "../../assets/images/mobile.png";
import laptops from "../../assets/images/laptops.png";
import groceries from "../../assets/images/shopping-bag.png";
import mens from "../../assets/images/Mens-cloth.png";
import furniture from "../../assets/images/furniture.png";
import decoration from "../../assets/images/home-decoration.png";
import Shoes from "../../assets/images/trainers.png";
import light from "../../assets/images/light.png";

const HeaderPage = () => {
  const items = useSelector((state) => state.allCart.cart);
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
  const customer = JSON.parse(sessionStorage.getItem("customerInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropShow, setDropShow] = useState(false);

  const logOutClick = () => {
    sessionStorage.setItem("isLoggedIn", false);
    dispatch(clearCart());
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <>
      <header>
        <div>
          <img src={logo} alt="logo" width="40" height="40" />
          <b>Shopper</b>
        </div>
        <nav>
          <span className="active">
            <Link to="home">Home</Link>
          </span>
          <span className="active">
            <Link to="products">Products</Link>
          </span>
          <span className="active">
            <Link to="shop">Shop</Link>
          </span>
          <span className="active">
            <Link to="about">About</Link>
          </span>
          <span className="active">
            <Link to="contact">Contact</Link>
          </span>
        </nav>
        <div className="header_right_side">
          <div>
            {isLoggedIn ? (
              <div onMouseOver={() => setDropShow(true)} id="dropdown-parent">
                <img
                  src={profile}
                  alt="person"
                  width="28"
                  height="28"
                  className="mb-2 me-2"
                />
                &nbsp;
                {customer[0].first}
                {dropShow ? (
                  <ul
                    onMouseOut={() => setDropShow(false)}
                    className="dropdown-child"
                  >
                    <li
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <span className="fa-solid fa-circle-user me-2"></span>
                      {customer[0]?.first}
                    </li>
                    <li
                      onClick={() => {
                        navigate("/wishlist");
                      }}
                    >
                      <span className="fa-solid fa-heart me-2"></span>
                      My Wishlist
                    </li>
                    <li onClick={logOutClick}>
                      <span className="fa-solid fa-toggle-on me-2"></span>
                      Log Out
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div
                onClick={() => {
                  navigate("/login");
                }}
                className="fa-solid fa-circle-user fs-5"
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                title="login"
              ></div>
            )}
          </div>

          <span className="position-relative" style={{ cursor: "pointer" }}>
            <span
              onClick={() => {
                navigate("/cartItem");
              }}
              className="ms-2"
            >
              <i className="fa-solid fa-cart-shopping" id="cartBox"></i>
              {items.length == 0 ? (
                ""
              ) : (
                <span className="badge rounded-pill bg-danger position-absolute">
                  {items.length}
                </span>
              )}
            </span>
          </span>
        </div>
      </header>
      <div id="mobile-navbar">
        <NavbarPage />
      </div>
      <nav>
        <div id="shopper_categories">
          <div className="category-container">
            <img src={mobiles} alt="mobile" />
            <div
              style={{ position: "absolute", left: "-10px", marginTop: "5px" }}
            >
              <Link to="catagories/smartphones" id="link">
                SmartPhones
              </Link>
            </div>
          </div>
          <div className="category-container">
            <img src={laptops} alt="laptops" />
            <div style={{ position: "absolute", marginTop: "5px" }}>
              <Link to="catagories/laptops" id="link">
                laptops
              </Link>
            </div>
          </div>
          <div className="category-container">
            <img src={groceries} alt="women's clothing" />
            <div style={{ position: "absolute", marginTop: "5px" }}>
              <Link to="catagories/groceries" id="link">
                Groceries
              </Link>
            </div>
          </div>
          <div className="category-container">
            <img src={mens} alt="Mens-shirts" />
            <div
              style={{ position: "absolute", left: "25px", marginTop: "5px" }}
            >
              <Link to="catagories/mens-shirts" id="link">
                Mens
              </Link>
            </div>
          </div>
          <div className="category-container">
            <img src={decoration} alt="Decoration" />
            <div
              style={{ position: "absolute", left: "-1px", marginTop: "5px" }}
            >
              <Link to="catagories/home-decoration" id="link">
                Decoration
              </Link>
            </div>
          </div>
          <div className="category-container">
            <img src={furniture} alt="furniture" />
            <div style={{ position: "absolute", marginTop: "5px" }}>
              <Link to="catagories/Furniture" id="link">
                Furniture
              </Link>
            </div>
          </div>
          <div className="category-container">
            <img src={Shoes} alt="Shoes" />
            <div
              style={{ position: "absolute", left: "22px", marginTop: "5px" }}
            >
              <Link to="catagories/mens-shoes" id="link">
                Shoes
              </Link>
            </div>
          </div>
          <div className="category-container">
            <img src={light} alt="lights" />
            <div
              style={{ position: "absolute", left: "15px", marginTop: "5px" }}
            >
              <Link to="catagories/sunglasses" id="link">
                Lighting
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderPage;
