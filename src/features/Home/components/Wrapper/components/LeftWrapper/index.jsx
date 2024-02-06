import React from "react";
import PropTypes from "prop-types";

import "./style.css";

function LeftWrapper(props) {
  return (
    <div className="wrapper__left">
      <p>Làn sóng 2023</p>
      <h1>
        Những bộ bàn gế mang hơi hướng tương lai <br />
      </h1>
      <h3>Giá hấp dẫn giảm 15% </h3>
      <button>Mua ngay</button>
    </div>
  );
}

LeftWrapper.propTypes = {};

export default LeftWrapper;
