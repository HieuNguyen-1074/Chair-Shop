import React from "react";
import PropTypes from "prop-types";
import messageBox from "../../../../assets/images/letter.png";
import out from "../../../../assets/images/logout.png";
import "./style.css";
import { useCookies } from "react-cookie";
function TopAdmin(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["dataUser"]);
  const handleLogout = () => {
    window.open("/", "_self");
    removeCookie("dataUser");
    localStorage.removeItem("dataUser");
  };
  return (
    <div className="top-admin">
      <h1></h1>
      <div className="top-admin-right">
        <div className="box"></div>
        <img
          onClick={handleLogout}
          src={out}
          alt=""
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

TopAdmin.propTypes = {};

export default TopAdmin;
