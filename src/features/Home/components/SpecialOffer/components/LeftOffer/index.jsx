import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function LeftOffer(props) {
  return (
    <div className="offer__left">
      <h1>Ưu đãi đặc biệt </h1>
      <h2>Cho khách hàng đặc biệt</h2>
      <h3>Giảm giá 10% khi mua 2 sản phẩm</h3>
    </div>
  );
}

LeftOffer.propTypes = {};

export default LeftOffer;
