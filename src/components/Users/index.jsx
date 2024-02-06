import React, { useState } from "react";
import PropTypes from "prop-types";
import { headerContent } from "../../constants/gobal";

import "./style.css";
import FormMain from "../FormMain";
import UserInfor from "../UserInfor";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import readCookie from "../../commons/readCookie";
function Users(props) {
  const { userContent } = headerContent;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const { userName, handleLogin, isLogin, setIsLogin } = props;
  const user = useSelector((state) => state.user.data);
  const [cookies, setCookie, removeCookie] = useCookies(["dataUser"]);
  const [move, setMove] = useState(false);
  const handleUserInfor = (status) => {
    setIsOpenUser(!isOpenUser);
  };

  const handleForm = (status) => {
    setIsOpen(status);
  };
  const handleMove = () => {
    if (move) {
    } else {
      setMove(true);
    }
  };
  const handleLeave = () => {
    setMove(false);
  };
  const handleLogout = () => {
    window.open("/", "_self");
    removeCookie("dataUser");
    localStorage.removeItem("dataUser");
    setIsLogin(false);
    setIsOpenUser(false);
  };
  return (
    <div className="user">
      <div>
        <div className="formusers">
          <FormMain
            isLogin={isLogin}
            isOpen={isOpen}
            handleForm={handleForm}
            userName={userName}
            handleLogin={handleLogin}
            setIsLogin={setIsLogin}
            setIsOpen={setIsOpen}
            setCookie={setCookie}
          />
        </div>
        <div
          className="user-img"
          onClick={() =>
            cookies.dataUser ? handleUserInfor(true) : handleForm(true)
          }
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <img src={userContent.src} alt="" />
          <p>
            {readCookie(cookies?.dataUser)?.NAMELOGIN
              ? String(readCookie(cookies?.dataUser)?.NAMELOGIN).slice(0, 5)
              : "Đăng nhập"}
          </p>
        </div>
        <div
          className="user-select"
          style={{
            display: isOpenUser ? "block" : "none",
          }}
        >
          <p>
            <Link to="/user">Thông tin</Link>
          </p>
          <p onClick={handleLogout}>
            Đăng xuất <FiLogOut />{" "}
          </p>
        </div>
        {/* <UserInfor
                    isOpenUser={isOpenUser}
                    handleUserInfor={handleUserInfor}
                    setIsLogin={setIsLogin}
                /> */}
      </div>
    </div>
  );
}

Users.propTypes = {};

export default Users;
