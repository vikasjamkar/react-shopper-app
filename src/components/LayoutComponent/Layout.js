import React from "react";
import HeaderPage from "../HeaderComponent/HeaderPage";
import FooterPage from "../FooterComponent/FooterPage";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isSignIn = location.pathname === "/login";
  const isSignup = location.pathname === "/register";
  if (isSignIn) {
    return (
      <>
        {!isSignIn && <HeaderPage />}
        <main>{children}</main>
        {!isSignIn && <FooterPage />}
      </>
    );
  } else {
    return (
      <>
        {!isSignup && <HeaderPage />}
        <main>{children}</main>
        {!isSignup && <FooterPage />}
      </>
    );
  }
};

export default Layout;
