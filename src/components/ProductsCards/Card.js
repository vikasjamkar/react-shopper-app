import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addWish } from "../../store/WishlistSlice";
import { useDispatch } from "react-redux";
const Card = ({ data }) => {
  const { id, thumbnail, title, brand, price, rating } = data;
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
  const dispatch = useDispatch();
  const wishItemAdd = (product) => {
    if (isLoggedIn) {
      dispatch(addWish(product));
      toast.success("Added to WishList");
    } else {
      toast.warn("You are not Log in");
    }
  };
  return (
    <div>
      <ToastContainer />
      <div
        className="product_card position-relative"
        data-aos="fade-up"
        key={id}
      >
        <div className="product_card_img">
          <Link to={`/details/` + id}>
            <img src={thumbnail} alt={title} />
          </Link>
        </div>
        <div className="product_card_body">
          <span
            className="fa-regular fa-heart position-absolute top-0  start-25 end-0 me-4 mt-3"
            id="heart"
            onClick={() => wishItemAdd(data)}
          ></span>
          {rating >= 6 ? (
            <div id="offer_label">{"Best Seller"}</div>
          ) : (
            <div></div>
          )}
          {/* {product.new === false ? (
            <div id="offer_label_02">{"new"}</div>
          ) : (
            <div></div>
          )} */}
          <p>{brand}</p>
          <div>
            <h6>{title}</h6>
            <div className="d-flex">
              <h5>&#8377;{price}</h5>
              <div id="rating">({rating}) %</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
