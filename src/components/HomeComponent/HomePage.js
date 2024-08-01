import React, { useEffect, useState } from "react";
import "./HomePage.css";
import f1 from "../../assets/images/f-1.jpg";
import f2 from "../../assets/images/f-2.jpg";
import f3 from "../../assets/images/f-3.jpg";
import f4 from "../../assets/images/f4.jpg";
import f5 from "../../assets/images/f5.jpg";
import f6 from "../../assets/images/f6.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hero1 from "../../assets/images/navBanner-2.jpg";
import hero2 from "../../assets/images/hero-1.jpg";

import b1 from "../../assets/images/B-1.png";
import b2 from "../../assets/images/B-2.png";
import b3 from "../../assets/images/B-3.svg";
import b4 from "../../assets/images/b-4.svg";
import b5 from "../../assets/images/B-5.png";

import { useDispatch } from "react-redux";
import { addWish } from "../../store/WishlistSlice";
import { Link } from "react-router-dom";
import { allCategory, allProducts } from "../../services/productServices";

const HomePage = () => {
  const dispatch = useDispatch();
  const [homeProduct, setHomeProduct] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));

  const getHomeProduct = async () => {
    const result = await allCategory("mobile-accessories");
    // const data = result.filter((product_sale) => product_sale.new === true);
    setHomeProduct(result);
  };

  const getNewArrival = async () => {
    const result = await allCategory("sports-accessories");
    // const data = result.filter((newArrival) => newArrival.new === false);
    setNewArrival(result);
  };

  useEffect(() => {
    getHomeProduct();
    getNewArrival();
  }, []);

  const wishItemAdd = (wish) => {
    if (isLoggedIn) {
      dispatch(addWish(wish));
      toast.success("Added to Wishlist");
    } else {
      toast.warn("You are not logged In");
    }
  };

  return (
    <>
      <section id="hero-banner" data-aos="zoom-in">
        <ToastContainer />
        <div>
          <h4>Product Category</h4>
          <p>New Collection</p>
        </div>
        <div className="hero-main-1">
          <div className="hero-container-1">
            <div id="discount-offer-2">
              <h5>
                30% <br /> Off
              </h5>
            </div>
          </div>
          <div className="hero-container-2">
            {" "}
            <div className="d-flex justify-content-end">
              <div id="discount-offer">
                <h5>
                  45% <br /> Off
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-main-2">
          <div className="hero-container-3">
            {" "}
            <div id="discount-offer-2">
              <h5>
                20% <br /> Off
              </h5>
            </div>
          </div>
          <div className="hero-container-4">
            <div className="d-flex justify-content-end">
              <div id="discount-offer">
                <h5>
                  50% <br /> Off
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="box" data-aos="flip-left">
          <img src={f1} alt="free shipping" />
          <h6>Free Shipping</h6>
        </div>

        <div className="box" data-aos="flip-left">
          <img src={f2} alt="online order" />
          <h6>Online Order</h6>
        </div>

        <div className="box" data-aos="flip-left">
          <img src={f3} alt="money saving" />
          <h6>Money Saving</h6>
        </div>

        <div className="box" data-aos="flip-left">
          <img src={f4} alt="promotion" />
          <h6>Promotion</h6>
        </div>

        <div className="box" data-aos="flip-left">
          <img src={f5} alt="happy sale" />
          <h6>Happy Sale</h6>
        </div>

        <div className="box" data-aos="flip-left">
          <img src={f6} alt="support" />
          <h6>27/4 Support</h6>
        </div>
      </section>

      <div id="title" data-aos="fade-up">
        <h1>Featured Products</h1>
        <p>Summer Collection New Morden Design</p>
      </div>

      <section id="products">
        {homeProduct.map((product) => (
          <div
            className="product_card position-relative"
            data-aos="fade-up"
            key={product.id}
          >
            <div className="product_card_img">
              <Link to={`/details/` + product.id}>
                <img src={product.thumbnail} alt={product.title} />
              </Link>
            </div>
            <div className="product_card_body">
              <span
                className="fa-regular fa-heart position-absolute top-0  start-25 end-0 me-4 mt-3"
                id="heart"
                onClick={() => wishItemAdd(product)}
              ></span>
              <div className="sale">Sale</div>
              <p>{product.brand}</p>
              <div>
                <h6>{product.title}</h6>
                <div>
                  <span className="bi bi-star-fill text-warning"></span>
                  <span className="bi bi-star-fill text-warning"></span>
                  <span className="bi bi-star-fill text-warning"></span>
                  <span className="bi bi-star-half text-warning">
                    &nbsp;{product.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="banner">
        <div>
          <p>Repair Services</p>
          <h4>
            Up to <strong> 70% off-</strong> All t-Shirts & Accessories
          </h4>
          <button className="btn btn-outline-light">Explore More</button>
        </div>
      </section>

      <div id="title" data-aos="fade-down">
        <h1>New Arrivals</h1>
        <p>Summer Collection New Morden Design</p>
      </div>

      <section id="products">
        {newArrival.map((product) => (
          <div
            className="product_card position-relative"
            data-aos="fade-up"
            key={product.id}
          >
            <div className="product_card_img">
              <Link to={`/details/` + product.id}>
                <img src={product.thumbnail} alt={product.title} />
              </Link>
            </div>
            <div className="product_card_body">
              <span
                className="fa-regular fa-heart position-absolute top-0  start-25 end-0 me-4 mt-3"
                id="heart"
                onClick={() => wishItemAdd(product)}
              ></span>
              <div id="offer-label">New</div>
              <p>{product.brand}</p>
              <div>
                <h6>{product.title.toLowerCase()}</h6>
                <div>
                  <span className="bi bi-star-fill text-warning"></span>
                  <span className="bi bi-star-fill text-warning"></span>
                  <span className="bi bi-star-fill text-warning"></span>
                  <span className="bi bi-star-half text-warning">
                    {product.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="brands">
        <div>
          <img src={b1} alt="brands" data-aos="zoom-in" />
        </div>
        <div>
          <img src={b2} alt="brands" data-aos="zoom-in" />
        </div>
        <div>
          <img src={b3} alt="brands" data-aos="zoom-in" />
        </div>
        <div>
          <img src={b4} alt="brands" data-aos="zoom-in" />
        </div>
        <div>
          <img src={b5} alt="brands" data-aos="zoom-in" />
        </div>
      </section>
    </>
  );
};

export default HomePage;
