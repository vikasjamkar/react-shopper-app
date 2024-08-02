import React, { useState } from "react";
import "./NavbarPage.css";
import justify from "../../assets/images/justify-1.png";
import close from "../../assets/images/close.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/images/memo_34.png";
import logo from "../../assets/images/shopperlogo.png";
import { LuAlignJustify } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { MdNotificationsNone } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa6";

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
    <div className="main-header">
      {/* <div className="header">
        <div className="logo">
          <div className="me-3">
            {" "}
            <img src={logo} alt="logo" width="50" height="50" />
          </div>
          <h1>Shopper</h1>
        </div>

        <div id="notification">
          <MdNotificationsNone />
        </div>
      </div> */}
      <div className="bottom_header">
        <div>
          <GoHome className="icon" onClick={homeClick} />
        </div>
        <div>
          <IoPersonCircleOutline className="icon" onClick={profileClick} />
        </div>
        <div>
          <AiOutlineShoppingCart className="icon" onClick={navCart} />{" "}
          {!items.length == 0 && (
            <div className="badge rounded-pill bg-danger position-absolute">
              {items.length}
            </div>
          )}
        </div>
        <div>
          <FaBoxOpen className="icon" onClick={ordersClick} />
        </div>
        <div>
          {isOpen ? (
            <span onClick={toggleCloseClick}>
              <RiCloseLargeFill className="icon" />
            </span>
          ) : (
            <span onClick={toggleJustifyClick}>
              <LuAlignJustify className="icon" />
            </span>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="nav-bar-container">
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

              {isLoggedIn && (
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "black",
                  }}
                  className="bi bi-chevron-down"
                  onClick={profileToggleClick}
                ></button>
              )}
            </div>
            {profile && isLoggedIn ? (
              <div className="profile">
                <span onClick={wishlistClick}>
                  <div id="icon">
                    <FaRegHeart />
                  </div>
                </span>

                <span onClick={logOutClick}>
                  <div id="icon">
                    {" "}
                    <FaToggleOn />
                  </div>
                </span>
              </div>
            ) : (
              ""
            )}
            <div className="navigator">
              <span>
                <span
                  onClick={homeClick}
                  className="d-flex justify-content-between link"
                >
                  Home <i className="bi bi-arrow-right"></i>
                </span>
              </span>
              <span>
                <span
                  onClick={productsClick}
                  className="d-flex justify-content-between link"
                >
                  Products <i className="bi bi-arrow-right"></i>
                </span>
              </span>
              <span>
                <span
                  onClick={shopClick}
                  className="d-flex justify-content-between link"
                >
                  Shop <i className="bi bi-arrow-right"></i>
                </span>
              </span>
              <span>
                <span
                  onClick={aboutClick}
                  className="d-flex justify-content-between link"
                >
                  About <i className="bi bi-arrow-right"></i>
                </span>
              </span>
              <span>
                <span
                  onClick={contactClick}
                  className="d-flex justify-content-between link"
                >
                  Contact <i className="bi bi-arrow-right"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarPage;
