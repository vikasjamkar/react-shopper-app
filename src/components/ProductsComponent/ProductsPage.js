import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWish } from "../../store/WishlistSlice";
import "./ProductsPage.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import empty from "../../assets/images/nodata.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  allCategories,
  allCategory,
  allProducts,
  singleProduct,
} from "../../services/productServices";
import planet from "../../assets/images/planet.png";
import justify from "../../assets/images/justify-1.png";
import close from "../../assets/images/close.png";
import poster01 from "../../assets/images/poster01.svg";
import poster02 from "../../assets/images/poster02.svg";
import poster05 from "../../assets/images/poster05.svg";
import poster04 from "../../assets/images/poster04.svg";

const FilterPrice = ({ onFilterChange }) => {
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleRadio = (e) => {
    const dataPrice = e.target.value;
    setSelectedPrice(dataPrice);
    onFilterChange(dataPrice);
  };
  return (
    <div className="mt-4">
      <h5>Price</h5>
      <div>
        <input
          type="radio"
          className="form-check-input me-2"
          name="price"
          value="all"
          onChange={handleRadio}
          checked={selectedPrice === "all"}
          // disabled={disable}
          id="all"
        />
        <label for="all">All</label>
      </div>
      <div>
        <input
          type="radio"
          className="form-check-input me-2"
          name="price"
          value="low"
          checked={selectedPrice === "low"}
          onChange={handleRadio}
          // disabled={disable}
          id="low"
        />
        <label for="low">Low</label>
      </div>
      <div>
        <input
          type="radio"
          className="form-check-input me-2"
          name="price"
          value="medium"
          checked={selectedPrice === "medium"}
          onChange={handleRadio}
          // disabled={disable}
          id="medium"
        />
        <label for="medium">Medium</label>
      </div>

      <div>
        <input
          type="radio"
          className="form-check-input me-2"
          name="price"
          checked={selectedPrice === "high"}
          onChange={handleRadio}
          value="high"
          id="high"
          // disabled={disable}
        />
        <label for="high">High</label>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));

  const [brands] = useState([
    {
      id: 1,
      brand: "Apple",
      value: "Apple",
    },

    {
      id: 2,
      brand: "Samsung",
      value: "Samsung",
    },
    {
      id: 3,
      brand: "Wipro",
      value: "Wipro",
    },
    {
      id: 4,
      brand: "HP",
      value: "HP",
    },
    {
      id: 5,
      brand: "H&M",
      value: "H&M",
    },
    {
      id: 6,
      brand: "Peter England",
      value: "Peter England",
    },
    {
      id: 7,
      brand: "Hollywood",
      value: "Hollywood",
    },
    {
      id: 8,
      brand: "L&V",
      value: "L&V",
    },
    {
      id: 9,
      brand: "Bewakoof",
      value: "Bewakoof",
    },
    {
      id: 10,
      brand: "Adidas",
      value: "Adidas",
    },
    {
      id: 11,
      brand: "Puma",
      value: "Puma",
    },
    {
      id: 12,
      brand: "Sofa Factory",
      value: "Sofa Factory",
    },
    {
      id: 12,
      brand: "Noise",
      value: "Noise",
    },
    {
      id: 12,
      brand: "Fastrack",
      value: "Fastrack",
    },
    {
      id: 12,
      brand: "Titan",
      value: "Titan",
    },
  ]);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const category = await allCategories();
    setCategories(category);
    console.log(category);
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(false);
      const result = await allProducts();
      setProducts(result.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    if (e.target.value === "all") {
      const result = await allProducts();
      setProducts(result);
      setNavOpen(false);
    } else {
      const result = await allCategory(e.target.value);
      setProducts(result);
      setNavOpen(false);
    }
  };

  const navtoDetails = (id) => {
    singleProduct(parseInt(id));
  };

  const wishItemAdd = (product) => {
    if (isLoggedIn) {
      dispatch(addWish(product));
      toast.success("Added to My Wishlist Item");
    } else {
      toast.warn("You are not logged In");
    }
  };

  // const handleNavigate = (productId) => {
  //   navigate("/products/details", { state: { id: productId } });
  // };

  const handlePriceFilterChange = async (selectedPrice) => {
    if (selectedPrice === "all") {
      const result = await allProducts();
      setProducts(result);
      setNavOpen(false);
    } else {
      const result = await allProducts();
      const data = result.filter((item) => {
        if (selectedPrice === "low") {
          setNavOpen(false);
          return item.price <= 1000;
        } else if (selectedPrice === "medium") {
          setNavOpen(false);
          return item.price > 200 && item.price <= 10000;
        } else if (selectedPrice === "high") {
          setNavOpen(false);
          return item.price > 30000 && item.price <= 200000;
        }
        return true;
      });
      setProducts(data);
    }
  };

  const sortProduct = () => {
    let data = [...products];
    if (data.length > 0) {
      let result = data.sort((a, b) => a.brand.localeCompare(b.brand));
      setProducts(result);
    }
  };

  const reverseProduct = () => {
    let data = [...products];
    if (data.length > 0) {
      let result = data.reverse((a, b) => a.brand.localeCompare(b.brand));
      setProducts(result);
    }
  };

  useEffect(() => {
    const searchData = products.filter((f) => {
      return f.brand.toLowerCase().match(search.toLocaleLowerCase());
    });
    setProducts(searchData);
  }, [search]);

  const searchInput = async (e) => {
    setSearch(e.target.value);
    if (e.target.value == "") {
      const result = await allProducts();
      setProducts(result);
    }
  };

  const handleBrands = async (e) => {
    const result = await allProducts();
    const resultData = result.filter((item) => {
      return item.brand === e.target.value;
    });
    setProducts(resultData);
    setNavOpen(false);
  };

  const navMenu = () => {
    setNavOpen(true);
  };

  const navMenuClose = () => {
    setNavOpen(false);
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
          <img src={planet} alt="planetImg" width="300" height="290" />
        </div>
      </div>
    );
  }
  return (
    <>
      <ToastContainer />
      <section id="product-navbar">
        <div style={{ cursor: "pointer" }}>
          {navOpen ? (
            <img
              src={close}
              alt="X - icon"
              width="30"
              height="30"
              onClick={navMenuClose}
            />
          ) : (
            <img
              src={justify}
              alt="Justify-icon"
              width="30"
              height="30"
              onClick={navMenu}
            />
          )}
        </div>
        <div className="product-navbar-box">
          <div>
            <input
              type="text"
              placeholder="Search Products"
              className="form-control"
              value={search}
              onChange={searchInput}
            />
          </div>
          <button
            className="bi bi-sort-alpha-down btn border border-1"
            onClick={sortProduct}
          ></button>
          <button
            className="bi bi-sort-alpha-up btn border border-1 ms-2"
            onClick={reverseProduct}
          ></button>
        </div>
      </section>

      <section id="grid">
        {navOpen ? (
          <nav>
            <h5>Filter Products</h5>
            <hr />
            <div className="nav-parent">
              <div className="nav-child-1">
                <h5>Categories</h5>
                <select
                  className="form-select form-select-sm"
                  onChange={handleChange}
                >
                  <option value="all">ALL</option>
                  {categories.map((category) => (
                    <option key={category} value={category.slug}>
                      {category.slug.toUpperCase()}
                    </option>
                  ))}
                </select>

                <FilterPrice
                  onFilterChange={handlePriceFilterChange}
                  // disable={disable}
                />
                <hr />
                <div className="mt-3">
                  <h5>Brands</h5>
                  {brands.map((item) => (
                    <div key={item.id}>
                      <input
                        type="radio"
                        className="form-check-input me-2"
                        name="brand"
                        value={item.value}
                        onChange={handleBrands}
                      />
                      {item.brand}
                    </div>
                  ))}
                </div>
              </div>
              <div className="nav-child-2">
                <div>
                  <img src={poster01} alt="adsBanner01" />
                </div>
                <div>{/* <img src={poster02} alt="adsBanner02" /> */}</div>
                <div>
                  <img src={poster05} alt="adsBanner03" />
                </div>
                <div>
                  <img src={poster04} alt="adsBanner04" />
                </div>
              </div>
            </div>
          </nav>
        ) : (
          ""
        )}
        <section>
          {products.length > 0 ? (
            products.map((product) => (
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
                  {product.rating >= 6 ? (
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
            ))
          ) : (
            <div>
              <div>
                <img src={empty} alt="nodata" height="200" width="200" />
                <h3>No Product Found</h3>
              </div>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default ProductsPage;
