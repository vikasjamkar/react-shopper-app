import React, { useState } from "react";
import "./NavbarPage.css";
import justify from "../../assets/images/justify-1.png";
import close from "../../assets/images/close.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/images/memo_34.png";
import logo from "../../assets/images/shopperlogo.png";

const NavbarPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const items = useSelector((state) => state.allCart.cart);
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
  const customer = JSON.parse(sessionStorage.getItem("customerInfo"));
  const navigate = useNavigate();

  const toggleJustifyClick = () => {
    setIsOpen(true);
  };
  const toggleCloseClick = () => {
    setIsOpen(false);
  };

  const navLogin = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const profileClick = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  const wishlistClick = () => {
    navigate("/wishlist");
    setIsOpen(false);
  };

  const ordersClick = () => {
    navigate("/order");
    setIsOpen(false);
  };

  const profileToggleClick = () => {
    setProfile(!profile ? true : false);
  };

  const logOutClick = () => {
    sessionStorage.setItem("isLoggedIn", false);
    setIsOpen(false);
    navigate("/home");
  };

  const navCart = () => {
    navigate("/cartItem");
  };

  const homeClick = () => {
    navigate("/home");
    setIsOpen(false);
  };

  const productsClick = () => {
    navigate("/products");
    setIsOpen(false);
  };

  const shopClick = () => {
    navigate("/shop");
    setIsOpen(false);
  };

  const aboutClick = () => {
    navigate("/about");
    setIsOpen(false);
  };

  const contactClick = () => {
    navigate("/contact");
    setIsOpen(false);
  };
  return (
    <div id="main-header">
      <div id="header">
        <div id="logo">
          <img src={logo} alt="" width="40" height="40" />{" "}
        </div>
        <div id="nav-icons">
          <span>
            <i
              className="fa-solid fa-cart-shopping position-relative"
              onClick={navCart}
            ></i>
            {items.length == 0 ? (
              ""
            ) : (
              <div className="badge rounded-pill bg-danger position-absolute">
                {items.length}
              </div>
            )}
          </span>
          {isOpen ? (
            <span onClick={toggleCloseClick}>
              <img src={close} alt="close" height="30" width="30" />
            </span>
          ) : (
            <span onClick={toggleJustifyClick}>
              <img src={justify} alt="justify" height="30" width="30" />
            </span>
          )}
        </div>
      </div>
      {isOpen ? (
        <div id="nav-bar-container">
          <div className="nav">
            <div className="nav-child">
              <span>
                {isLoggedIn ? (
                  <h5
                    onClick={profileClick}
                    style={{ textTransform: "capitalize" }}
                  >
                    <img src={avatar} alt="person" width="40" height="40" />
                    &nbsp; {customer[0].first}
                  </h5>
                ) : (
                  <h5
                    onClick={() => navLogin()}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Sign In | Shopper
                  </h5>
                )}
              </span>

              {isLoggedIn ? (
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "black",
                  }}
                  className="bi bi-chevron-down"
                  onClick={profileToggleClick}
                ></button>
              ) : (
                ""
              )}
            </div>
            {profile && isLoggedIn ? (
              <div id="profile">
                <span
                  onClick={profileClick}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="bi bi-person-circle fs-5" id="circle-icon">
                    {" "}
                    &nbsp; My Profile
                  </div>
                  <div className="bi bi-chevron-right"></div>
                </span>
                <span
                  className="d-flex justify-content-between align-items-center"
                  onClick={wishlistClick}
                >
                  <div className="bi bi-heart fs-5" id="circle-icon">
                    {" "}
                    &nbsp; My Wishlist
                  </div>
                  <div className="bi bi-chevron-right"></div>
                </span>

                <span
                  className="d-flex justify-content-between align-items-center"
                  onClick={ordersClick}
                >
                  <div className="bi bi-box fs-5" id="circle-icon">
                    {" "}
                    &nbsp; My Orders
                  </div>
                  <div className="bi bi-chevron-right"></div>
                </span>

                <span
                  onClick={logOutClick}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div id="circle-icon" className="bi bi-toggle-off fs-5">
                    {" "}
                    &nbsp; Log out
                  </div>
                  <div className="bi bi-chevron-right"></div>
                </span>
              </div>
            ) : (
              ""
            )}
            <div id="navigator">
              <span>
                <span
                  id="link"
                  onClick={homeClick}
                  className="d-flex justify-content-between"
                >
                  Home <i className="bi bi-arrow-right"></i>
                </span>
              </span>
              <span>
                <span
                  id="link"
                  onClick={productsClick}
                  className="d-flex justify-content-between"
                >
                  Products <i className="bi bi-arrow-right"></i>
                </span>
              </span>
              <span>
                <span
                  id="link"
                  onClick={shopClick}
                  className="d-flex justify-content-between"
                >
                  Shop <i className="bi bi-arrow-right"></i>
                </span>
              </span>
              <span>
                <span
                  id="link"
                  onClick={aboutClick}
                  className="d-flex justify-content-between"
                >
                  About <i className="bi bi-arrow-right"></i>
                </span>
              </span>
              <span>
                <span
                  id="link"
                  onClick={contactClick}
                  className="d-flex justify-content-between"
                >
                  Contact <i className="bi bi-arrow-right"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavbarPage;
