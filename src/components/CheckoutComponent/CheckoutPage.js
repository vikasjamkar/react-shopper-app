import React, { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { useDispatch, useSelector } from "react-redux";
import master from "../../assets/images/mastercard.svg";
import visa from "../../assets/images/visa.svg";
import paypal from "../../assets/images/razorpay.svg";
import { clearCart, getCartTotal, remove } from "../../store/CartSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.allCart.cart);
  const { totalAmount } = useSelector((state) => state.allCart);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  const amount = parseInt(totalAmount);
  const currency = "INR";
  const receiptId = "qwsaq1";
  const customer = JSON.parse(sessionStorage.getItem("customerInfo"));
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));

  useEffect(() => {
    if (isLoggedIn) {
      navigate("");
      // toast.info("Happy Shopping 😊");
    } else {
      navigate("/login");
    }
    dispatch(getCartTotal());
  }, [carts]);

  const paymentHandler = async () => {
    const response = await fetch("http://127.0.0.1:2030/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();

    var options = {
      key: "rzp_test_UCWB0DOpqxYuiR", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: `Shopper | Online Shopping`, //your business name
      description: "Test mode",
      image: "",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
          date: new Date().toLocaleDateString(),
          price: order.amount / 100,
          address: address,
          contactInfo: email,
          userId: customer[0]?._id,
          carts,
        };

        const validateRes = await fetch(
          "http://127.0.0.1:2030/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        const data = await jsonRes;
        dispatch(clearCart());
        localStorage.removeItem("cart");
        navigate("/confirm");
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: first, //your customer's name
        email: email,
        contact: mobile,
        // address: address,
        //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: address,
      },
      theme: {
        color: "#050615",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      toast.error(response.error.reason);
      // navigate("/login");
      // console.log(response.error.metadata.order_id);
      // toast.error(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const handleBlur = () => {
    if (first == "") {
      toast.warn("First Name is required");
    } else if (first.length <= 3) {
      toast.warn("Name to short");
    } else if (first.length > 10) {
      toast.warn("Name to Long");
    }
  };

  const handleBlurLast = () => {
    if (last == "") {
      toast.warn("Last Name is required");
    } else if (last.length <= 4) {
      toast.warn("Name to short");
    } else if (last.length > 10) {
      toast.warn("Name to Long");
    }
  };

  const handleBlurEmail = () => {
    if (email == "") {
      toast.warn("Email is required");
    } else if (email.endsWith("@outlook.com")) {
      toast.info("Only Gmail is allowed");
    }
  };

  const handleBlurMobile = () => {
    if (mobile == "") {
      toast.warn("Mobile is required");
    } else if (isNaN(mobile)) {
      toast.warn("Please enter Number");
    } else if (!mobile.match(/\+91\d{10}/)) {
      toast.warn("invalid Mobile Number:+91 10 digit");
    }
  };

  const handleBlurCity = () => {
    if (city == "") {
      toast.error("City is required");
    }
  };

  const handleBlurPost = () => {
    if (postCode == "") {
      toast.error("Postcode is required");
    } else if (isNaN(postCode)) {
      toast.error("Enter valid Number");
    }
  };

  const handleOrder = (e) => {
    if (e.target.checked) {
      setDisable(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div id="check-title">
        <h2>Checkout</h2>
      </div>
      <section id="checkout-container">
        <main>
          <h5>
            {" "}
            <i className="fa-regular fa-address-card"></i>&nbsp;Billing Details
          </h5>
          <form action="post">
            <div>
              <label htmlFor="">First Name</label>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFirst(e.target.value)}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Last Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => setLast(e.target.value)}
                  disabled={first == "" || first.length <= 3 ? true : false}
                  onBlur={handleBlurLast}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Email Address</label>
              <div>
                <input
                  type="text"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={last == "" || last.length <= 4 ? true : false}
                  onBlur={handleBlurEmail}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Mobile</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Mobile"
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={email.endsWith("@gmail.com") ? false : true}
                  onBlur={handleBlurMobile}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">City Name</label>
              <div>
                <input
                  type="text"
                  placeholder="City Name"
                  onChange={(e) => setCity(e.target.value)}
                  disabled={mobile.match(/\+91\d{10}/) ? false : true}
                  onBlur={handleBlurCity}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Postcode</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Postcode"
                  onChange={(e) => setPostcode(e.target.value)}
                  disabled={city == 0 ? true : false}
                  onBlur={handleBlurPost}
                  maxLength="6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Address</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter address"
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={postCode == 0 || isNaN(postCode) ? true : false}
                />
              </div>
            </div>
          </form>
          <div id="payment">
            <h5>
              <i className="fa-regular fa-credit-card"></i>&nbsp;Payments
            </h5>
            <div className="payment-Box d-flex">
              <input
                type="radio"
                name="card"
                disabled={address == 0 ? true : false}
                onClick={handleOrder}
              />
              &nbsp;
              <img src={paypal} alt="" width="100" height="50" />
            </div>
          </div>
        </main>
        <nav>
          <div id="cartItem">
            <h5>Your cart item ({carts.length})</h5>
            <div>
              {carts.map((item) => (
                <div className="items" key={item.id}>
                  <div>
                    <img src={item.thumbnail} alt="" height="100" width="100" />
                  </div>
                  <div>
                    <p>{item.title}</p>
                    <p>&#8377;{item.discountPrice.toFixed(2)}</p>
                    <p>Qty:{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="orders">
            <h5>Order Summary</h5>
            <div className="orderTotal">
              <div>Sub Total</div>
              <div>&#8377;{totalAmount.toFixed(2)}</div>
            </div>
            <div className="orderTotal">
              <div>Tax</div>
              <div>&#8377;0</div>
            </div>
            <div className="orderTotal">
              <div>Shipping Charges</div>
              <div>Free</div>
            </div>
            <div className="orderTotal fw-bolder">
              <div>Total Amount</div>
              <div>&#8377;{totalAmount.toFixed(2)}</div>
            </div>
          </div>
          <div id="placeOrder">
            {disable ? (
              <button
                disabled={disable}
                className="opacity-50"
                style={{ cursor: "not-allowed" }}
              >
                Place Order
              </button>
            ) : (
              <button onClick={paymentHandler}>Place Order</button>
            )}
          </div>
        </nav>
      </section>
    </div>
  );
};

export default CheckoutPage;
