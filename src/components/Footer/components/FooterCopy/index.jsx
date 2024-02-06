import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { imgBt } from "../../../../constants/image";

function FooterCopy(props) {
  return (
    <div className="footer__copy">
      <h1>copyright@HIEUNGUYEN</h1>
      <div className="footer__copy--link">
        {/* {
                    imgBt.map((item, index) => {
                        return <a href="" key={index}>
                            <img src={item.src} alt="" />

                        </a>
                    })
                } */}
      </div>
    </div>
  );
}

FooterCopy.propTypes = {};

export default FooterCopy;
