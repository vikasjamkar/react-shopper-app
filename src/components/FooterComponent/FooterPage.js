import React from "react";
import "./FooterPage.css";
import svg from "../../assets/images/mastercard.svg";
import svg2 from "../../assets/images/visa.svg";
import svg3 from "../../assets/images/amex.svg";
import svg4 from "../../assets/images/paypal.svg";
import svg5 from "../../assets/images/maestro.svg";

const FooterPage = () => {
  return (
    <>
      <footer>
        <div className="text-center">
          <h3>Want Style Ideas and Treats?</h3>
          <div>
            <input type="text" placeholder="Email address" />{" "}
            <span>
              <button>Subscribe</button>
            </span>
          </div>
        </div>
        <div>
          <div id="sub-footer">
            <div>
              <ol>
                <li>
                  <h5>Shopper</h5>
                  <span className="bi bi-facebook me-2"></span>
                  <span className="bi bi-youtube me-2"></span>
                  <span className="bi bi-twitter me-2"></span>
                  <span className="bi bi-instagram me-2"></span>
                  <span className="bi bi-medium "></span>
                </li>
              </ol>
            </div>
            <div>
              <ol>
                <li>
                  <h5>Support</h5>
                </li>
                <li>Contact Us</li>
                <li>FAQ's</li>
                <li>Size Guide</li>
                <li>Shipping & Returns</li>
              </ol>
            </div>

            <div>
              <ol>
                <li>
                  <h5>Shop</h5>
                </li>
                <li>Men's Shopping</li>
                <li>Women's Shopping</li>
                <li>Kid's Shopping</li>
                <li>Discount</li>
              </ol>
            </div>

            <div>
              <ol>
                <li>
                  <h5>Company</h5>
                </li>
                <li>Our Story</li>
                <li>Careers</li>
                <li>Terms & Condition</li>
                <li>Privacy & Cookie policy</li>
              </ol>
            </div>

            <div>
              <ol>
                <li>
                  <h5>Contact</h5>
                </li>
                <li>1-202-555-0105</li>
                <li>1-202-555-0105</li>
                <li>help@shopper.com</li>
              </ol>
            </div>
          </div>
        </div>
        <hr />
        <div id="copyright">
          <div>
            <p>© 2024 All rights reserved. Designed by Vikas Jamkar</p>
          </div>
          <div>
            <span className="me-2">
              <img src={svg} alt="paymentImg" />
            </span>
            <span className="me-2">
              <img src={svg2} alt="paymentImg" />
            </span>
            <span className="me-2">
              <img src={svg3} alt="paymentImg" />
            </span>
            <span className="me-2">
              <img src={svg4} alt="paymentImg" />
            </span>
            <span className="me-2">
              <img src={svg5} alt="paymentImg" />
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterPage;
