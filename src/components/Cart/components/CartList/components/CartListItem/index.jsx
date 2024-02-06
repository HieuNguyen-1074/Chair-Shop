import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Button } from "@material-ui/core";
import InputField from "./../../../../../../custom-field/InputField/index";

import { FaPlus, FaRegWindowMinimize } from "react-icons/fa";
import {
  increaseQuality,
  reduceQuality,
  removeItem,
} from "../../../../../../redux/SliceCart";
import { useDispatch, useSelector } from "react-redux";

function CartListItem(props) {
  const { src, discount, rate, name, id, price, quality, isInPay } = props;
  const dispatch = useDispatch();

  const handleIncreaseQuality = () => {
    console.log("i");
    const action = increaseQuality(id);
    dispatch(action);
  };
  const handleReduceQuality = () => {
    const action = reduceQuality(id);
    dispatch(action);
  };
  const handleRemove = () => {
    const action = removeItem(id);
    dispatch(action);
  };

  return (
    <div className="cart__list--item">
      <div className="cart__list--item-infor">
        <img src={src} alt="" />
        <div className="cart__list--item-infor-main">
          <h1>{name}</h1>
          {isInPay || (
            <Button variant="contained" color="#ed6c63" onClick={handleRemove}>
              Xóa
            </Button>
          )}
        </div>
      </div>
      <div className="cart__list--item-quality">
        <h1>Số lượng</h1>
        <div className="cart__list--item-quality-main">
          {isInPay || <FaRegWindowMinimize onClick={handleReduceQuality} />}

          <Button variant="outlined">{quality}</Button>
          {isInPay || <FaPlus onClick={handleIncreaseQuality} />}
        </div>
        {/* <div className="cart__list--item-quality-main">

                </div> */}
      </div>
      <div className="cart__list--item-quality">
        <h1>Giá </h1>
        <Button variant="outlined">${price}</Button>
      </div>
      <div className="cart__list--item-quality">
        <h1>Tổng </h1>

        <Button variant="outlined">{price * quality} VND</Button>
      </div>
    </div>
  );
}

CartListItem.propTypes = {};

export default CartListItem;
