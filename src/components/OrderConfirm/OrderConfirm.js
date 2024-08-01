import { React, useEffect } from "react";
import orderImg from "../../assets/images/confirm.svg";
import { useNavigate } from "react-router-dom";
import "./orderConfirm.css";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));

  const orderClick = () => {
    navigate("/order");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <section id="confirm-container">
      <div className="confirm-box">
        <img src={orderImg} alt="order" />
        <div className="order-button">
          <button className="btn btn-dark text-white" onClick={orderClick}>
            Go to My Orders <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirm;
