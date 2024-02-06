import React from "react";
import PropTypes from "prop-types";

import { Formik, FastField } from "formik";
import { logoLink } from "../../../../constants/gobal";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import InputField from "./../../../../custom-field/InputField/index";

import "./style.css";
import Users from "../../../Users";
import Cart from "../../../Cart";
import { Button } from "@material-ui/core";

function HeaderCenter(props) {
  const {
    userName,
    handleLogin,
    isLogin,
    setIsLogin,
    setCookie,
    removeCookie,
  } = props;
  return (
    <div className="header__center">
      <img
        src={logoLink}
        alt=""
        className="header__center--logo"
        onClick={() => window.open("/", "_self")}
      />

      <Formik>
        <form className="header__center--form">
          <FastField
            name="search"
            type="text"
            component={InputField}
            placeholder="Tìm kiếm....."
          />

          <button>
            <BsSearch />
          </button>
        </form>
      </Formik>
      <div className="header__center--right">
        <Cart />
        <Button variant="outlined">
          <Users
            userName={userName}
            handleLogin={handleLogin}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            removeCookie={removeCookie}
          />
        </Button>
        {/* <div className='help'>
                    <p>service/help</p>
                    <IoMdArrowDropdown />
                </div> */}
      </div>
    </div>
  );
}

HeaderCenter.propTypes = {};

export default HeaderCenter;
