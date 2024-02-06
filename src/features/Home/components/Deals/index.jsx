import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import TopDeal from "./components/Top";

import { productItems } from "../../../../constants/gobal/index";
import ItemProduct from "../../../../components/ItemProduct";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { fetchGetData } from "../../../../commons/fetchData";

function Deals(props) {
  const products = useSelector((state) => state.product.data);
  const [screen, setScreen] = useState(window.innerWidth);
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      screen < 888 && screen > 688
        ? 4
        : screen < 688 && screen > 505
        ? 3
        : screen < 505
        ? 2
        : 5,
    slidesToScroll: 3,
    slidesPerRow: 1,
  });
  const category = useSelector((state) => state.category.data);
  const [changeData, setChange] = useState(false);

  // const settings = {
  //     className: "center",
  //     centerMode: true,
  //     infinite: true,
  //     centerPadding: "60px",
  //     slidesToShow: 3,
  //     speed: 500,
  //     rows: 1,
  //     slidesPerRow: 2
  //   };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreen(window.innerWidth);
    });
    return () => {
      // window.removeEventListener('resize', () => {
      // })
    };
  });
  const ref = useRef({});

  const next = () => {
    ref.current.slickNext();
  };

  const prev = () => {
    ref.current.slickPrev();
  };
  // const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1
  //   };
  // const settings = {
  //     dots: false,
  //     infinite: true,
  //     speed: 500,
  //     slidesToScroll: 1,
  //     rows: 1,

  // slidesToScroll: 1
  // };

  return (
    <div className="deal">
      <TopDeal sliderNext={next} sliderPrev={prev} />

      <Slider ref={ref} {...settings} className="deal__slider">
        {products.length === 0
          ? ""
          : products.map((item, index) => {
              const src = `data:image/png;base64,${item.IMGARR[0]?.src}`;
              return (
                <ItemProduct
                  src={src}
                  key={index}
                  discount={item.DISCOUNT}
                  name={item.PRODUCTNAME}
                  id={item.PRODUCTCODE}
                  price={item.PRICE}
                  rate={item.RATE}
                  categoryName={
                    category.find((e) => e.CATEGORYCODE === item.CATEGORYID)
                      ?.CATEGORYNAME
                  }
                />
              );
            })}
      </Slider>
    </div>
  );
}

Deals.propTypes = {};

export default Deals;
