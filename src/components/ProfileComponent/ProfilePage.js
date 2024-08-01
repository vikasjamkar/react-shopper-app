import React, { useEffect, useRef, useState } from "react";
import "./ProfilePage.css";
import profile from "../../assets/images/memo_34.png";
import { updateProfile } from "../../services/productServices";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderPage from "../OrderComponent/OrderPage";
import WishlistPage from "../WishlistComponent/WishlistPage";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/CartSlice";
import { useDispatch } from "react-redux";
const ProfilePage = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [component, setComponent] = useState();
  const [visible, setVisible] = useState(false);
  const [save, setSave] = useState(true);
  const navigate = useNavigate();
  const customer = JSON.parse(sessionStorage.getItem("customerInfo"));
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("");
      // toast.info("Happy Shopping 😊");
    } else {
      navigate("/login");
    }
    const userInfo = JSON.parse(sessionStorage.getItem("customerInfo"));
    setCustomerId(userInfo?.[0]._id);
    axios.get("http://127.0.0.1:2050/customers").then((res) => {
      editClick(userInfo?.[0]._id, res.data);
      setUsers(res.data);
    });
  }, []);

  const editClick = async (_id, userData) => {
    const editProfile = userData.filter((item) => item._id === _id);
    setFirst(editProfile[0]?.first);
    setLast(editProfile[0]?.last);
    setAge(editProfile[0]?.age);
    setEmail(editProfile[0]?.email);
    setMobile(editProfile[0]?.mobile);
    setPassword(editProfile[0]?.password);
    setAddress(editProfile[0]?.address);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      customerId,
      first,
      last,
      age,
      email,
      mobile,
      password,
      address,
    };
    updateProfile(data);
    toast.success("Profile Update Successfully");
    setSave(true);
  };

  // useEffect(() => {
  //   component;
  //   return () => {
  //     component;
  //   };
  // }, []);

  const handleOrder = () => {
    setComponent(<OrderPage disable={true} />);
    setVisible(true);
  };

  const handleWishNav = () => {
    setComponent(
      <WishlistPage
        height="auto"
        theme="rgba( 255, 255, 255, 0.3 )"
        container_theme="none"
        radius="10px"
        card_width="220px"
        card_height="auto"
      />
    );
    setVisible(true);
  };
  const handleProfileNav = () => {
    setVisible(false);
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("isLoggedIn", false);
    dispatch(clearCart());
    localStorage.removeItem("cart");
    navigate("/home");
  };

  return (
    <>
      <div>
        <ToastContainer />
        <section id="profile-container">
          <div id="nav">
            <div id="profile-box">
              <div>
                <img src={profile} alt="" width="40" height="40" />
              </div>{" "}
              <h5>Hello {customer[0]?.first}</h5>
            </div>
            <div className="nav-box">
              <div>
                <span className="fa-solid fa-sliders"></span> {"Dashboard"}
              </div>
              <div onClick={handleOrder}>
                <span className="fa-solid fa-box-open"></span> {"My Orders"}
              </div>
              <div onClick={handleWishNav}>
                <span className="fa-regular fa-heart"></span> {"My Wishlists"}
              </div>
              <div onClick={handleProfileNav}>
                <span className="fa-solid fa-user-circle"></span>{" "}
                {"Update Profile "}
              </div>
              <div onClick={handleLogOut}>
                <span className="fa-solid fa-toggle-on"></span> {"Log Out"}
              </div>
            </div>

            <div id="nav-box-mobile">
              <div>
                <span className="fa-solid fa-sliders"></span>
              </div>
              <div onClick={handleOrder}>
                <span className="fa-solid fa-box-open"></span>
              </div>
              <div onClick={handleWishNav}>
                <span className="fa-regular fa-heart"></span>
              </div>
              <div onClick={handleProfileNav}>
                <span className="fa-solid fa-user-circle"></span>{" "}
              </div>
              <div onClick={handleLogOut}>
                <span className="fa-solid fa-toggle-on"></span>
              </div>
            </div>
          </div>
          <div id="main">
            {visible ? (
              <div>{component}</div>
            ) : (
              <div>
                <h5>Personal Information</h5>
                <form action="post">
                  <div className="form-container">
                    <div>
                      <label htmlFor="first">First Name</label>
                      <div>
                        <input
                          type="text"
                          placeholder="First Name"
                          id="first"
                          value={first}
                          onChange={(e) => {
                            setFirst(e.target.value);
                            setSave(false);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="last">Last Name</label>
                      <div>
                        <input
                          type="text"
                          placeholder="Last Name"
                          id="last"
                          value={last}
                          onChange={(e) => {
                            setLast(e.target.value);
                            setSave(false);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="age">Age</label>
                      <div>
                        <input
                          type="text"
                          id="age"
                          placeholder="Enter Age"
                          value={age}
                          onChange={(e) => {
                            setAge(e.target.value);
                            setSave(false);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email">Email Address</label>
                      <div>
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter Email Address"
                          required
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setSave(false);
                          }}
                          value={email}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="mobile">Mobile</label>
                      <div>
                        <input
                          type="text"
                          id="mobile"
                          placeholder="Enter Mobile Number"
                          value={mobile}
                          onChange={(e) => {
                            setMobile(e.target.value);
                            setSave(false);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password">password</label>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Password"
                          id="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setSave(false);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address">Address</label>
                      <div>
                        <textarea
                          cols="20"
                          rows="5"
                          id="address"
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                            setSave(false);
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="frmButton">
                    {save ? (
                      <button
                        onClick={handleSave}
                        className="opacity-25"
                        disabled={save}
                      >
                        Save Change
                      </button>
                    ) : (
                      <button onClick={handleSave}>Update Profile</button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
