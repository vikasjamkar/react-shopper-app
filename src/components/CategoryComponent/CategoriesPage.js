import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./CategoryPage.css";
import { useDispatch } from "react-redux";
import { addWish } from "../../store/WishlistSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import planet from "../../assets/images/severdown.svg";
import { Link } from "react-router-dom";
import { allCategory } from "../../services/productServices";

const CategoriesPage = () => {
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await allCategory(params.cat);
        setCategory(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    })();
  }, [params.cat]);

  // const handleNavigate = (productId) => {
  //   navigate("/products/details", { state: { id: productId } });
  // };

  const wishItemAdd = (product) => {
    if (isLoggedIn) {
      dispatch(addWish(product));
      toast.success("Added to WishList");
    } else {
      toast.warn("You are not Log in");
    }
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
          <img src={planet} alt="" width="300" height="290" />
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <section id="categories">
        <div id="category-title">
          <h5>Category | {params.cat}</h5>
        </div>
        <div id="main">
          <div className="main-container">
            {category.map((product) => (
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
                  {product.price >= 80000 ? (
                    <div id="offer_label">{"Top Seller"}</div>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesPage;
