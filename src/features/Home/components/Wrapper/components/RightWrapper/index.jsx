import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ItemWrapper from "./components/Items";
import { chairContent } from "../../../../../../constants/gobal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useSelector } from "react-redux";

function RightWrapper(props) {
  const products = useSelector((state) => state.product.data);
  let productSlider;
  if (products.length === 0) {
    productSlider = [];
  } else {
    productSlider = products[0].IMGARR;
  }

  // const { IMGARR } = productSlider;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <FcNext />,
    prevArrow: <FcPrevious />,
  };

  return (
    <Slider {...settings} className="wrapper__right">
      {productSlider.map((item, index) => {
        const src = `data:image/png;base64,${item.src}`;
        return <ItemWrapper key={index} src={src} content="" />;
      })}
    </Slider>
  );
}

RightWrapper.propTypes = {};

export default RightWrapper;
