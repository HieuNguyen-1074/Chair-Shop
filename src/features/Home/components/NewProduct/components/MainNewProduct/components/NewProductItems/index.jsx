import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { productItems } from "../../../../../../../../constants/image";
import ItemProduct from "./../../../../../../../../components/ItemProduct/index";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./style.css";
import { useSelector } from "react-redux";

function NewProductItems(props) {
  const { setNext, setPrev } = props;
  const products = useSelector((state) => state.product.data);
  const [screen, setScreen] = useState(window.innerWidth);
  const ref = useRef({});
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreen(window.innerWidth);
    });
  });
  const next = () => {
    return () => {
      ref.current.slickNext();
    };
  };

  const category = useSelector((state) => state.category.data);
  const prev = () => {
    return () => {
      ref.current.slickPrev();
    };
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      screen < 800 && screen > 675
        ? 4
        : screen < 675 && screen > 510
        ? 3
        : screen < 510
        ? 2
        : 3,
    slidesToScroll: 1,
    // rows: 1,
    slidesPerRow: 2,
  };

  useEffect(() => {
    setPrev(prev);
    setNext(next);
  }, []);

  return (
    <div className="newproductitems">
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

NewProductItems.propTypes = {};

export default NewProductItems;
