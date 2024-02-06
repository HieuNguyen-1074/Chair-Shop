import React from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import "./style.css";
import { BsDot } from "react-icons/bs";
function TopBox(props) {
  const { handleClose, userSend } = props;
  return (
    <div className="box-chat-box-top">
      <div className="box-chat-box-top-left">
        <h1> {userSend ? userSend.NAMELOGIN : "admin"}</h1>
        <BsDot />
      </div>

      <FaTimes onClick={handleClose} />
    </div>
  );
}

TopBox.propTypes = {};

export default TopBox;
