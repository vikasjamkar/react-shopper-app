import React from "react";
import about from "../../assets/images/aboutus.jpg";
import app from "../../assets/images/App.mp4";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div>
      <div id="aboutBanner">
        <div>
          <h5>#Know Us</h5>
          <p>Shopper is online ecommerce platform</p>
        </div>
      </div>
      <div id="about-container">
        <div>
          <img src={about} alt="about us" width="100%" height="auto" />
        </div>
        <div>
          <h5>Who We are ?</h5>
          <p>
            Welcome to Shopper, your ultimate destination for a delightful
            online shopping experience! At Shopper, we believe that shopping
            should be more than just a transaction—it should be an adventure
            filled with excitement, convenience, and discovery.Our journey began
            with a passion for connecting people with the products they love,
            and over the years, we have evolved into a trusted platform that
            caters to the diverse needs and preferences of our global community
            of shoppers. Whether you're searching for the latest fashion trends,
            innovative gadgets, home essentials, or unique gifts, we've got you
            covered with a curated selection of high-quality products from top
            brands and emerging designers. What sets us apart is our commitment
            to excellence in every aspect of your shopping journey. From
            seamless navigation and secure transactions to prompt delivery and
            dedicated customer support, we strive to exceed your expectations at
            every turn. Our user-friendly interface makes it easy to browse,
            compare, and purchase products with confidence, ensuring a
            hassle-free shopping experience from start to finish.But Shopper is
            more than just a marketplace—it's a vibrant community of passionate
            shoppers, trendsetters, and influencers who inspire and empower each
            other every day. We believe in the power of connection, creativity,
            and collaboration, and we're dedicated to fostering a dynamic
            ecosystem where ideas thrive and dreams come to life.
          </p>
        </div>
      </div>

      <div id="aboutApp">
        <div>
          <h4>
            Download Our <strong> App</strong>
          </h4>
          <video height="auto" width="100%" autoPlay loop muted>
            <source src={app} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
