import React from "react";
import { navbarLink } from "../../constants/gobal";
import FormMain from "../FormMain";
import HeaderTop from "./components/Header-top";
import HeaderCenter from "./components/HeaderCenter";
import Navbar from "./components/Navbar/index";

export default function Header(props) {
  const {
    userName,
    handleLogin,
    isLogin,
    setIsLogin,
    setCookie,
    removeCookie,
  } = props;

  return (
    <div>
      <HeaderTop />
      <HeaderCenter
        userName={userName}
        handleLogin={handleLogin}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setCookie={setCookie}
        removeCookie={removeCookie}
      />
    </div>
  );
}
