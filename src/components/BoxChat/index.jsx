import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { BsChatSquareDots } from "react-icons/bs";
import Box from "./components/Box";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import readCookie from "../../commons/readCookie";
import { io } from "socket.io-client";
function BoxChat(props) {
  const { permission, isBox, setIsBox, isLogin, userSend, setUserSend } = props;

  const [cookies, setCookie, removeCookie] = useCookies(["dataUser"]);
  const user = readCookie(cookies.dataUser)
    ? readCookie(cookies.dataUser)
    : JSON.parse(localStorage.getItem("dataUser"));
  const [socket, setSocket] = useState(null);
  const [read, setRead] = useState(false);
  useEffect(() => {
    let socket = io("http://localhost:3000/", {
      path: "/api/socket/",
      query: {
        ACCOUNTCODE: user?.ACCOUNTCODE,
      },
    });
    setSocket(socket);
    socket.on("connection", () => {
      // x8WIv7-mJelg7on_ALbx
      console.log("first");
    });

    socket.on(`mess`, (res) => {
      console.log("first");
      if (isBox) {
        setRead(true);
      } else {
        setRead(false);
      }
    });
  }, []);
  const handleOpen = () => {
    setIsBox(true);
  };
  const handleClose = () => {
    setIsBox(false);
    console.log(isBox);
  };
  console.log(user);
  return (
    <div className="box-chat">
      {user?.PERMISSION === "ADMIN" ? (
        ""
      ) : (
        <BsChatSquareDots onClick={handleOpen} />
      )}
      <Box
        handleClose={handleClose}
        isBox={isBox}
        read={read}
        permission={permission}
        isLogin={isLogin}
        userSend={userSend}
        socketio={socket}
      />
    </div>
  );
}

BoxChat.propTypes = {};

export default BoxChat;
