import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Flight Booking. All rights reserved.</p>
        <p>
          <a href="/contact">Contact Us</a> | <a href="/info">FAQs</a> |{" "}
          <a href="/about">About Us</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
