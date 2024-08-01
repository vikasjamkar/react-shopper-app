import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "../../store/store";
import "./IndexPage.css";
import ProductsPage from "../ProductsComponent/ProductsPage";
import HomePage from "../HomeComponent/HomePage";
import CategoriesPage from "../CategoryComponent/CategoriesPage";
import CartPage from "../CartComponent/CartPage";
import ShopPage from "../ShopComponent/ShopPage";
import WishlistPage from "../WishlistComponent/WishlistPage";
import LoginPage from "../LoginComponent/LoginPage";
import SignUpPage from "../SignUpComponent/SignUpPage";
import AboutPage from "../AboutComponent/AboutPage";
import ContactPage from "../ContactComponent/ContactPage";
import ProductDetailsPage from "../DetailsComponent/ProductDetailsPage";
import NotfoundPage from "../NotFoundComponent/NotfoundPage";
import ProfilePage from "../ProfileComponent/ProfilePage";
import CheckoutPage from "../CheckoutComponent/CheckoutPage";
import OrderPage from "../OrderComponent/OrderPage";
import OrderConfirm from "../OrderConfirm/OrderConfirm";
import NavbarPage from "../NavbarComponent/NavbarPage";
import Layout from "../LayoutComponent/Layout";

const IndexPage = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="products" element={<ProductsPage />}></Route>
              <Route path="home" element={<HomePage />}></Route>
              <Route path="/" element={<HomePage />}></Route>
              <Route
                path="catagories/:cat"
                element={<CategoriesPage />}
              ></Route>
              <Route
                path="details/:id"
                element={<ProductDetailsPage />}
              ></Route>
              <Route path="profile" element={<ProfilePage />}></Route>
              <Route path="contact" element={<ContactPage />}></Route>
              <Route path="about" element={<AboutPage />}></Route>
              <Route path="login" element={<LoginPage />}></Route>
              <Route path="register" element={<SignUpPage />}></Route>
              <Route path="shop" element={<ShopPage />}></Route>
              <Route path="cartItem" element={<CartPage />}></Route>
              <Route path="wishlist" element={<WishlistPage />}></Route>
              <Route path="checkout" element={<CheckoutPage />}></Route>
              <Route path="order" element={<OrderPage />}></Route>
              <Route path="confirm" element={<OrderConfirm />}></Route>
              <Route path="nav" element={<NavbarPage />}></Route>
              <Route path="/*" element={<NotfoundPage />}></Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </>
  );
};
export default IndexPage;
