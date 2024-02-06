import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import "./style.scss";
import { BiSend } from "react-icons/bi";
import ItemChat from "./components/ItemChat/index";
//import { io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../../../../redux/SliceMessage";
import { addAlert } from "../../../../../../redux/SlideAlert";
import readCookie from "../../../../../../commons/readCookie";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { fetchGetData } from "../../../../../../commons/fetchData";
import { io } from "socket.io-client";

function BoxMain(props) {
  const { isLogin, permission, userSend, socketio, isBox } = props;
  const [dataMessage, setDataMessage] = useState([]);

  const [userCode, setUserCode] = useState("");
  const dispatch = useDispatch();
  const [mess, setMess] = useState("");
  // socket.on('chat message', function (msg) {
  //     console.log(msg)
  const [cookies, setCookie, removeCookie] = useCookies(["dataUser"]);
  const user = readCookie(cookies.dataUser)
    ? readCookie(cookies.dataUser)
    : JSON.parse(localStorage.getItem("dataUser"));
  // });
  useEffect(() => {
    if (isLogin === true) {
      permission === "ADMIN"
        ? setUserCode("ACOO1")
        : permission === "USER"
        ? setUserCode(user.ACCOUNTCODE)
        : setUserCode("");
    }
  }, [isLogin]);
  useEffect(() => {
    let stringUrl = `/api/mess?userSend=${
      user?.PERMISSION === "ADMIN" ? "ADMIN" : user?.ACCOUNTCODE
    } &userTo=${
      user?.PERMISSION !== "ADMIN" ? "ADMIN" : userSend?.ACCOUNTCODE
    }`;
    fetchGetData(stringUrl).then((res) => {
      let s = res.sort((a, b) => {
        return dayjs(b?.DATESENT).isAfter(dayjs(a?.DATESENT)) ? 1 : -1;
      });
      setDataMessage(s);
    });
  }, [userSend, isBox]);
  useEffect(() => {
    if (socketio) {
      socketio.on(`mess`, async (messr) => {
        console.log(messr);
        let stringUrl = `/api/mess?userSend=${
          user?.PERMISSION === "ADMIN" ? "ADMIN" : user?.ACCOUNTCODE
        } &userTo=${
          user?.PERMISSION !== "ADMIN"
            ? "ADMIN"
            : messr?.TOUSER === "ADMIN"
            ? messr?.USERSENT
            : messr?.TOUSER
        }`;
        await fetchGetData(stringUrl).then((res) => {
          let s = res.sort((a, b) => {
            return dayjs(b?.DATESENT).isAfter(dayjs(a?.DATESENT)) ? 1 : -1;
          });
          setDataMessage(s);
        });
      });
    }
  }, [socketio]);

  const onSubmit = () => {
    if (mess.trim() === "") {
      return;
    }
    console.log(userSend);
    const dataSend = {
      USERSENT: user?.PERMISSION === "ADMIN" ? "ADMIN" : user.ACCOUNTCODE,
      TOUSER: user?.PERMISSION === "ADMIN" ? userSend?.ACCOUNTCODE : "ADMIN",
      CONTENT: mess,
      isAdmin: user?.PERMISSION === "ADMIN" ? true : false,
      DATESEND: dayjs(),
      ISREAD: user?.PERMISSION === "ADMIN" ? true : false,
    };

    socketio.emit(`mess`, dataSend);
    setMess("");
    // socket.emit('chat message', 'sssssss');
  };
  return (
    <div className="box-chat-box-main">
      <div className="box-message">
        {dataMessage.map((mess) => {
          let align = mess?.USERSENT === user?.ACCOUNTCODE ? "right" : "left";
          if (user?.PERMISSION === "ADMIN") {
            align = mess?.USERSENT === "ADMIN" ? "right" : "left";
          }

          return <ItemChat content={mess} align={align} />;
        })}
      </div>

      <div className="input">
        <textarea
          className="box-message"
          variant="outlined"
          size="medium"
          value={mess}
          onChange={(e) => setMess(e.target.value)}
        ></textarea>

        <BiSend onClick={onSubmit} />
      </div>
    </div>
  );
}

BoxMain.propTypes = {};

export default BoxMain;
