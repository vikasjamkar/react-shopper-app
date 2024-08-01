import React from "react";
import Page from "../../assets/images/notFound.svg";
import "./NotFoundPage.css";

const NotfoundPage = () => {
  return (
    <>
      <div id="notFound">
        <img src={Page} alt="not-found-img" />
      </div>
    </>
  );
};

export default NotfoundPage;
