import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { logoLink, linkContact } from "../../../../constants/gobal";

function FooterContact(props) {
  return (
    <div className="footer__contact">
      <img src={logoLink} alt="" />
      <div
        className="footer__contact--main"
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <p href="" className="footer__contact--main-address">
          {" "}
          Địa chỉ: Khu CN Kim Thiều - Hương Mạc - Từ Sơn - Bắc Ninh
        </p>
        <p href="" className="footer__contact--main-phone">
          Điện thoại: 0774.222.886 - 0854.889.883
        </p>
        <p href="" className="footer__contact--main-email"></p>
      </div>
    </div>
  );
}

FooterContact.propTypes = {};

export default FooterContact;
