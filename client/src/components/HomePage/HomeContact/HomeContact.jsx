import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import "./HomeContact.css";

const HomeContact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_c2e48ho",
        "template_56kx9va",
        form.current,
        "40TaN8whDl2q4ioTy"
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
          console.log("Messages sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
    toast.success("Email sent successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="home-contact">
      <div className="content-contact">
        <h2>Contact Us</h2>
        <p>
        Any questions or needs <br/> you can contact our system via the mailbox below.
        </p>
      </div>
      <div className="left-contact">
        <h3>Send messages</h3>
        <form ref={form} onSubmit={sendEmail}>
          <div className="input-box">
            <input type="text" name="user_name" required />
            <label>Name</label>
          </div>

          <div className="input-box">
            <input type="text" name="user_email" required />
            <label>Email</label>
          </div>
          <div className="input-box">
            <textarea name="message" required />
            <label>Message</label>
          </div>
          <div className="input-box">
            <input type="submit" value="Send" />
          </div>
        </form>
      </div>
      <div className="right-contact"></div>
    </div>
  );
};

export default HomeContact;
