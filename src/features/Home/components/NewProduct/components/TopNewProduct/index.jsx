import React from "react";
import PropTypes from "prop-types";

import "./style.css";

import { FcPrevious, FcNext } from "react-icons/fc";

function TopNewProduct(props) {
  const { next, prev } = props;
  return (
    <div className="newproduct__top">
      <div className="newproduct__top--left">
        <h1>Sản Phẩm Mới</h1>
      </div>

      <div className="newproduct__top--right">
        <FcPrevious className="prev" onClick={prev} />
        <FcNext className="next" onClick={next} />
      </div>
    </div>
  );
}

TopNewProduct.propTypes = {};

export default TopNewProduct;
