import React, { useState } from "react";
import PropTypes from "prop-types";
import TopBox from "./components/Top/index";
import BoxMain from "./components/BoxMain";
import "./style.scss";
function Box(props) {
  const {
    handleClose,
    isBox,
    permission,
    isLogin,
    userSend,
    setUserSend,

    socketio,
  } = props;

  return (
    <div>
      <div
        style={{
          transform: isBox
            ? "translate(-97%, -100%) "
            : " translate(100%, -100%)",
          opacity: isBox ? "1" : "0",
        }}
        className="box-chat-box"
      >
        <TopBox handleClose={handleClose} userSend={userSend} />
        <BoxMain
          isLogin={isLogin}
          isBox={isBox}
          permission={permission}
          userSend={userSend}
          socketio={socketio}
        />
      </div>
    </div>
  );
}

Box.propTypes = {};

export default Box;
