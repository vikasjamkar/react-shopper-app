import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../store/CartSlice";
import { toggleCartQty, getCartTotal } from "../../store/CartSlice";
import cartImg from "../../assets/images/emptycart.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.allCart.cart);
  const { itemsCount, totalAmount } = useSelector((state) => state.allCart);
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));

  const handleCart = (productId) => {
    let flag = window.confirm(
      `Are you sure want to Remove this Product from cart?`
    );
    if (flag == true) {
      dispatch(remove(productId));
      toast.error("Removed from Cart Items");
    }
  };

  const loginClick = () => {
    navigate("/login");
  };

  const checkOut = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts]);

  const backShopping = () => {
    navigate("/products");
  };

  return (
    <div id="cart-container">
      <ToastContainer />
      <div className="cart-title">
        <h2>Cart Items</h2>
      </div>

      <section className="cartTable">
        {carts.length == 0 ? (
          <div className="cartEmpty">
            <div>
              <img src={cartImg} alt="" width="200" height="230" />
              <h5>Missing Cart items?</h5>
            </div>
          </div>
        ) : (
          <div id="cart-grid">
            <div className="table-responsive" id="table-container">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Title</th>
                    <th className="text-center">Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <a href={product?.thumbnail}>
                          <img
                            src={product?.thumbnail}
                            alt=""
                            height="80"
                            width="80"
                          />
                        </a>
                      </td>
                      <td>{product.title}</td>
                      <td>
                        <div id="quantity">
                          <div>{product.quantity}</div>
                          <div>
                            <button
                              className="bi bi-dash-circle fs-5"
                              onClick={() =>
                                dispatch(
                                  toggleCartQty({
                                    id: product?.id,
                                    type: "DEC",
                                  })
                                )
                              }
                            ></button>

                            <button
                              className="bi bi-plus-circle fs-5"
                              onClick={() =>
                                dispatch(
                                  toggleCartQty({
                                    id: product?.id,
                                    type: "INC",
                                  })
                                )
                              }
                            ></button>
                          </div>
                        </div>
                      </td>
                      <td>&#8377;{product.discountPrice?.toFixed(2)}</td>
                      <td>&#8377;{product.totalPrice?.toFixed(2)}</td>
                      <td>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleCart(product.id)}
                          className="fa-solid fa-trash-can"
                        ></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <div id="TotalBox">
                <div id="priceBox">
                  <div className="checklist">
                    <div>
                      <p>No of Items</p>
                    </div>
                    <div>({itemsCount})</div>
                  </div>
                  <hr />
                  <div className="checklist">
                    <div>
                      <p>Tax</p>
                    </div>
                    <div>
                      <p>&#8377;0</p>
                    </div>
                  </div>
                  <hr />

                  <div className="checklist">
                    <div>
                      <p>Total Amount</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: "bold" }}>
                        &#8377;{totalAmount?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div id="proceed">
                  {isLoggedIn ? (
                    <button onClick={checkOut}>
                      Proceed to Checkout
                      <i className="bi bi-arrow-right ms-4"></i>
                    </button>
                  ) : (
                    <button onClick={loginClick}>Login</button>
                  )}
                </div>
              </div>
              <div id="continue">
                <button onClick={backShopping}>
                  {" "}
                  <i className="bi bi-arrow-left me-4"></i>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CartPage;
