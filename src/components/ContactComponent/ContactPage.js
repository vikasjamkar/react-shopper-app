import React, { useRef, useState } from "react";
import "./ContactPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [style, setStyle] = useState({ border: "" });
  const formRef = useRef(null);

  const verifyEmail = () => {
    if (email == "") {
      setStyle({
        border: "",
      });
    } else if (email.endsWith("outlook.com")) {
      toast.error("only Gmail is allowed");
    } else if (email.endsWith("gmail.com")) {
      setStyle({
        border: "",
      });
    } else {
      toast.warn("Enter valid email");
      setStyle({
        border: "1px solid red",
      });
    }
  };

  const values = { name, email, msg };

  const submitContact = (e) => {
    e.preventDefault();
    if (name == "" || email == "" || msg == "") {
      toast.error("All field are required");
    } else {
      axios({
        method: "post",
        url: "http://127.0.0.1:2050/contact",
        data: values,
      })
        .then(() => {
          toast.success(`Thank you !! Your message is submitted ${name}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const resetContact = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const map =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.4490605866613!2d73.81423917423596!3d18.46330757092278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2956a20fbac17%3A0x91987f7033fd2e3c!2sAbhiruchi%20Mall%20%26%20Multiplex!5e0!3m2!1sen!2sin!4v1707319654787!5m2!1sen!2sin";
  return (
    <>
      <ToastContainer />
      <section id="contactBanner">
        <div>
          <h5>#Contact Us</h5>
          <p>We love to hear from you!</p>
        </div>
      </section>
      <section id="contact-container">
        <div className="contact-left">
          <iframe
            src={map}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact-right">
          <form action="post" onSubmit={submitContact} ref={formRef}>
            <h5>Contact | Shopper</h5>
            <hr />
            <div>
              <label htmlFor="name">Name</label>
              <div>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <label htmlFor="email">Email</label>
              <div>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={verifyEmail}
                  style={style}
                />
              </div>
              <label htmlFor="message">Message</label>
              <div>
                <textarea
                  id="message"
                  cols="60"
                  rows="8"
                  onChange={(e) => setMsg(e.target.value)}
                ></textarea>
              </div>
              <button onClick={resetContact} className="bi bi-send">
                &nbsp; &nbsp;Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
      <section id="contact-footer">
        <div>
          <div className="text-center fs-4">
            <i class="fa-solid fa-envelope"></i>
          </div>
          <div>shopperhelp@gmail.com</div>
        </div>
        <div>
          <div className="text-center fs-4">
            <i class="fa-brands fa-twitter"></i>
          </div>
          <div>@Shopper</div>
        </div>
        <div>
          <div className="text-center fs-4">
            <i class="fa-brands fa-google-play"></i>
          </div>
          <div>Shopper App</div>
        </div>
        <div>
          <div className="text-center fs-4">
            <i class="fa-solid fa-phone"></i>
          </div>
          <div>+918822336655</div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
