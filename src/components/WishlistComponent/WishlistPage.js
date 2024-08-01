import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWish } from "../../store/WishlistSlice";
import emptyWish from "../../assets/images/wishlist.svg";
import "./WishlistPage.css";
import { add } from "../../store/CartSlice";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishlistPage = (props) => {
  const wishItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));

  const wishListRemove = (productId) => {
    dispatch(removeWish(productId));
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div
      id="wishBox"
      style={{
        backgroundColor: props.theme,
        height: props.height,
        borderRadius: props.radius,
      }}
    >
      <ToastContainer />
      <h2>My Wishlist </h2>

      <section className="wish-container">
        {wishItems.length == 0 ? (
          <div
            className="emptyWishBanner"
            style={{ background: props.container_theme }}
          >
            <div>
              <img
                src={emptyWish}
                alt="emptyWishlist"
                width="300"
                height="270"
              />
            </div>
          </div>
        ) : (
          <div>
            <div id="wishCards">
              <>
                {wishItems.map((product) => (
                  <div
                    className="product_card position-relative"
                    key={product.id}
                    style={{
                      width: props.card_width,
                      height: props.card_height,
                    }}
                  >
                    <div className="product_card_img">
                      <Link to={`/details/` + product.id}>
                        <img src={product.thumbnail} alt={product.title} />
                      </Link>
                    </div>
                    <div className="product_card_body">
                      <span
                        className="bi bi-dash-circle position-absolute top-0  start-25 end-0 me-4 mt-3 fs-3  text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => wishListRemove(product.id)}
                      ></span>

                      <p>{product.brand}</p>
                      <div>
                        <h6>{product.title}</h6>
                        <div className="d-flex">
                          <h5>&#8377;{product.price}</h5>
                          <div id="rating">({product.rating}) %</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default WishlistPage;
