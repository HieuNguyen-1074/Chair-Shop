import React from "react";
import PropTypes from "prop-types";

import "./style.css";
import Header from "../../components/Header";

import ProductMain from "./components/ProductMain";
import Footer from "../../components/Footer";
import { useHistory } from "react-router-dom";

function Product(props) {
  const {
    userName,
    handleLogin,
    isLogin,
    setIsLogin,
    setCookie,
    removeCookie,
  } = props;
  var search = window.location.search.substring(1);

  return (
    <>
      <Header
        userName={userName}
        handleLogin={handleLogin}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setCookie={setCookie}
        removeCookie={removeCookie}
      />
      <ProductMain search={search} />
      <Footer />
    </>
  );
}

Product.propTypes = {};

export default Product;
