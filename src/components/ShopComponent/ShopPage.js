import React, { useEffect, useState } from "react";
import "./ShopPage.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import b1 from "../../assets/images/brand-1.svg";
import b2 from "../../assets/images/brand-2.svg";
import b3 from "../../assets/images/brand-3.svg";
import b4 from "../../assets/images/brand-4.svg";
import b5 from "../../assets/images/brand-5.svg";
import {
  allCategories,
  allCategory,
  allProducts,
} from "../../services/productServices";
import { useDispatch } from "react-redux";
import { addWish } from "../../store/WishlistSlice";
import { add } from "../../store/CartSlice";

const ShopPage = () => {
  const [smartphones, setSmartphones] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [womenShoes, setWomenShoes] = useState([]);
  const [quantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
  useEffect(() => {
    (async () => {
      const result = await allCategory("smartphones");
      // const data = result.products;
      // const filterData = data.filter((p) => p.category === "smartphones");
      setSmartphones(result);
    })();
    (async () => {
      const result = await allCategory("laptops");
      // const data = result.products.filter((p) => p.category === "laptops");
      setLaptops(result);
    })();

    (async () => {
      const result = await allCategory("mens-shoes");
      // const data = result.products.filter((p) => {
      //   return p.category === "Mens Shoes";
      // });
      setShoes(result);
    })();

    (async () => {
      const result = await allProducts();
      const data = result.products.filter((p) => {
        return p.category === "Women Shoes";
      });
      setWomenShoes(data);
    })();
  }, []);

  const wishItemAdd = (wish) => {
    if (isLoggedIn) {
      dispatch(addWish(wish));
      toast.success("Added to Wishlist");
    } else {
      toast.warn("You are not logged In");
    }
  };

  // const shopAdd = (data) => {
  //   let discountPrice =
  //     data.price - data.price * (data.discountPercentage / 100);
  //   let totalPrice = quantity * discountPrice;
  //   dispatch(add({ ...data, quantity: quantity, totalPrice, discountPrice }));
  //   toast.success("Added to cart");
  //   setTimeout(() => {
  //     navigate("/cartItem");
  //   }, 1000);
  // };

  return (
    <section>
      <ToastContainer />
      <div id="shop-category-1"></div>

      <section id="categories_products">
        {smartphones.map((product) => (
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
              {product.price >= 16000 ? (
                <div id="offer_label">{"Best Seller"}</div>
              ) : (
                <div></div>
              )}
              {product.new === false ? (
                <div id="offer_label_02">{"new"}</div>
              ) : (
                <div></div>
              )}
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
      </section>

      <div id="shop-category-2"></div>

      <section id="categories_products">
        {laptops.map((product) => (
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
              {product.price >= 16000 ? (
                <div id="offer_label">{"Best Seller"}</div>
              ) : (
                <div></div>
              )}
              {product.new === false ? (
                <div id="offer_label_02">{"new"}</div>
              ) : (
                <div></div>
              )}
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
      </section>

      <div id="shop-category-3"></div>

      <section id="categories_products">
        {shoes.map((product) => (
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
              {product.price >= 16000 ? (
                <div id="offer_label">{"Best Seller"}</div>
              ) : (
                <div></div>
              )}
              {product.new === false ? (
                <div id="offer_label_02">{"new"}</div>
              ) : (
                <div></div>
              )}
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

        {womenShoes.map((product) => (
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
              {product.price >= 16000 ? (
                <div id="offer_label">{"Best Seller"}</div>
              ) : (
                <div></div>
              )}
              {product.new === false ? (
                <div id="offer_label_02">{"new"}</div>
              ) : (
                <div></div>
              )}
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
      </section>

      <div className="text-center mt-4 mb-5">
        <button
          className="bg-dark btn text-white"
          onClick={() => navigate("/products")}
        >
          More Categories <i className="bi bi-arrow-right"></i>
        </button>
      </div>
      <section id="brands">
        <div>
          <img src={b1} alt="brands" height="100" width="100" />
        </div>
        <div>
          <img src={b2} alt="brands" height="100" width="100" />
        </div>
        <div>
          <img src={b3} alt="brands" height="100" width="100" />
        </div>
        <div>
          <img src={b4} alt="brands" height="100" width="100" />
        </div>
        <div>
          <img src={b5} alt="brands" height="100" width="100" />
        </div>
      </section>
    </section>
  );
};

export default ShopPage;
