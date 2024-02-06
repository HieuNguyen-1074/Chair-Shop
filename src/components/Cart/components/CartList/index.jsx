import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import CartListItem from "./components/CartListItem";
import { FaTimes } from "react-icons/fa";
import { logoImg, productItems } from "../../../../constants/image";
import CartListPay from "./components/CartListPay";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function CartList(props) {
  const { closeCart, isOpen, listCart } = props;
  let totalItem = 0;
  let totalPrice = 0;
  listCart.forEach((element) => {
    totalPrice += element.price * element.quality;
    totalItem += element.quality;
  });
  return (
    <div className={isOpen ? "cart__list active" : "cart__list"}>
      <div className="container">
        <div className="cart__list--content">
          <div className="cart__list--content-top">
            <img src={logoImg} alt="" />
            <h1>Giỏ hàng</h1>
            <FaTimes onClick={closeCart} />
          </div>
          <div className="cart__list--content-main">
            {listCart.length === 0 ? (
              <p>Không có sản phẩm nào</p>
            ) : (
              listCart.map((item, index) => {
                const { src, discount, rate, nameProduct, id, price, quality } =
                  item;
                return (
                  <CartListItem
                    key={index}
                    src={src}
                    discount={discount}
                    rate={rate}
                    name={nameProduct}
                    id={id}
                    price={price}
                    quality={quality}
                    img={item.src}
                  />
                );
              })
            )}
          </div>
        </div>

        <CartListPay totalItem={totalItem} totalPrice={totalPrice} />
      </div>
    </div>
  );
}

CartList.propTypes = {};

export default CartList;
