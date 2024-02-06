import React, { useState } from "react";
import PropTypes from "prop-types";

import "./style.css";
import Login from "../FormLogin/Login";
import Sign from "../FormSign/Sign";

import { FaTimes } from "react-icons/fa";

function FormMain(props) {
  const {
    handleForm,
    isOpen,
    userName,
    handleLogin,
    isLogin,
    setIsOpen,
    setCookie,
  } = props;

  const [formPosition, setFormPosition] = useState("login");

  const onChange = (setValue, e) => {
    setValue(e.target.value);
  };
  const changePosition = (position, e) => {
    e.preventDefault();
    setFormPosition(position);
    console.log(position);
  };

  return (
    <div
      className="formmain"
      style={{
        display: `${isOpen ? "unset" : "none"}`,
        width: isLogin ? "0px" : "100%",
      }}
    >
      <FaTimes className="formmain__icon" onClick={() => handleForm(false)} />
      <div className="container">
        {/* <FormLogin
                    formPosition={formPosition}
                    changePosition={changePosition}
                /> */}
        <Login
          formPosition={formPosition}
          changePosition={changePosition}
          handleLogin={handleLogin}
          setIsOpen={setIsOpen}
          onChange={onChange}
          setCookie={setCookie}
        />
        {/* <FormSign
                    formPosition={formPosition}
                    changePosition={changePosition}
                /> */}
        <Sign
          formPosition={formPosition}
          changePosition={changePosition}
          setIsOpen={setIsOpen}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

FormMain.propTypes = {};

export default FormMain;
