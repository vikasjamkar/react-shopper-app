import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ProductDetailsPage.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { add } from "../../store/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addWish } from "../../store/WishlistSlice";
import free from "../../assets/images/free-delivery .png";
import order from "../../assets/images/order.png";
import service from "../../assets/images/24-hours-support.png";
import money from "../../assets/images/cashback.png";
import { singleProduct } from "../../services/productServices";
import ReviewLayout from "../ReviewLayout/ReviewLayout";

const ProductDetailsPage = () => {
  const [proInfo, setProInfo] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [des, setDes] = useState(true);
  const [size, setSize] = useState(false);
  const [ship, setShip] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await singleProduct(params.id);
        console.log(result);
        setProInfo(result);
        // for (let product of result.products) {
        //   setProInfo(product);
        // }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    })();
  }, [params.id]);

  const cartItemAdd = (product) => {
    let discountPrice =
      product.price - product.price * (product.discountPercentage / 100);
    let totalPrice = quantity * discountPrice;

    dispatch(
      add({ ...product, quantity: quantity, totalPrice, discountPrice })
    );
    toast.success("Added to Cart item");
  };

  const addWishList = (wishItem) => {
    dispatch(addWish(wishItem));
    toast.success("Add to wishlist");
  };

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > proInfo?.stock) tempQty = proInfo?.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };
  if (loading) {
    return (
      <div id="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="loader-container">
        <div>
          <h1>error</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <section id="Details-parent">
        {Object.keys(proInfo).length !== 0 ? (
          <div className="Details-child-1">
            <div className="big-image">
              <img
                src={isHovered ? proInfo.images[isHovered] : proInfo.thumbnail}
                id="firstImg"
                alt="Product img"
              />
            </div>
            <div className="small-images">
              {proInfo?.images.map((item, i) => {
                return (
                  <span key={item.i}>
                    {proInfo.images[i + 0] !== undefined ? (
                      <img
                        src={proInfo.images[i + 0]}
                        alt="Products Images"
                        onMouseOver={() => setIsHovered(i + 0)}
                      />
                    ) : (
                      ""
                    )}
                  </span>
                );
              })}{" "}
            </div>
          </div>
        ) : (
          "Loading Images"
        )}

        <div className="Details-child-2">
          <h5>{proInfo.title}</h5>
          <h6>{proInfo.description}</h6>
          <hr />
          <div style={{ display: "flex" }}>
            <div id="ratings">
              <span className="bi bi-star-fill text-warning"></span>
              <span className="bi bi-star-fill text-warning"></span>
              <span className="bi bi-star-fill text-warning"></span>
              <span className="bi bi-star-half text-warning"></span>
              <span>&nbsp;({proInfo.rating})</span>{" "}
            </div>
            <span id="brand">
              Brand:{proInfo.brand} | Category: {proInfo.category}
            </span>
          </div>
          <hr />

          <strong>
            &#8377;
            {(
              proInfo.price -
              proInfo.price * (proInfo.discountPercentage / 100)
            ).toFixed(2)}
          </strong>
          <strike>&#8377;{proInfo.price}</strike>
          <span id="discount">{proInfo.discountPercentage}% off</span>
          <div id="available-offers">
            <h4>Available Offers</h4>
            <ul>
              <li>Buy This Product and get ₹500 Off on Next AC Purchase*T&C</li>
              <li>
                Special PriceGet extra 5% off (price inclusive of
                cashback/coupon)
              </li>
              <li>
                Bank Offer10% off on HSBC Bank Credit Card and EMI Transactions
              </li>
            </ul>
          </div>
          <div>
            <h6>Quantity</h6>
            <div id="quantityBox">
              <div id="quantityValue">{quantity}</div>
              <div>
                <span
                  onClick={decreaseQty}
                  className="bi bi-dash-circle fs-5"
                ></span>
                <span
                  onClick={increaseQty}
                  className="bi bi-plus-circle fs-5"
                ></span>
              </div>
            </div>
          </div>
          <div id="buttons">
            <button onClick={() => cartItemAdd(proInfo)}>
              <i className="fa-solid fa-cart-shopping"></i> &nbsp; Add to Cart
            </button>
            <button onClick={() => addWishList(proInfo)}>
              <i className="fa-regular fa-heart"></i> &nbsp;Add to Wishlist
            </button>
          </div>
        </div>
      </section>
      <section>
        <div id="Details_reviews">
          <div className="Details_reviews_title">
            <h4
              onClick={() => {
                setReview("description");
                setSize(false);
                setDes(true);
              }}
              style={{ color: des ? "orangered" : "black" }}
            >
              Description
            </h4>
            <h4
              onClick={() => {
                setDes(false);
                setReview("size");
                setSize(true);
                setShip(false);
              }}
              style={{ color: size ? "orangered" : "black" }}
            >
              Size & Fit
            </h4>
            <h4
              onClick={() => {
                setSize(false);
                setReview("shipping");
                setShip(true);
                setDes(false);
              }}
              style={{ color: ship ? "orangered" : "black" }}
            >
              Shipping & Return
            </h4>
          </div>
        </div>
        <div className="Details_review_info">
          <div>
            <ReviewLayout title={review} data={proInfo} />
          </div>
        </div>
      </section>

      <section id="feature-box">
        <div>
          <img src={free} alt="Free Shipping" />
          <div className="text-center mt-2">Free Shipping</div>
        </div>
        <div>
          <img src={order} alt="Online Order" />
          <div className="text-center mt-2">Online Order</div>
        </div>
        <div>
          <img src={money} alt="Money Saving" />
          <div className="text-center mt-2">Money Saving</div>
        </div>
        <div>
          <img src={service} alt="24/7 Services" />
          <div className="text-center mt-2">24/7 Services</div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
