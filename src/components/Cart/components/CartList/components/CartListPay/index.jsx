import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import InputField from "../../../../../../custom-field/InputField";
import { Formik } from "formik";
import SelectField from "../../../../../../custom-field/SelectField";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostData } from "../../../../../../commons/fetchData";
import { removeAll } from "../../../../../../redux/SliceCart";
import { useHistory } from "react-router-dom";

function CartListPay(props) {
  const { totalItem, totalPrice } = props;
  const dispatch = useDispatch();
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [shipping, setShopping] = useState(options[0].value);
  const cartList = useSelector((state) => state.cart.data);
  const history = useHistory();
  const user = useSelector((state) => state.user.data);
  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(user).length === 0) {
      alert("user login yet");
      return;
    }
    const data = cartList.map((item, index) => {
      const { discount, id, nameProduct, price, quality } = item;
      return {
        discount,
        id,
        nameProduct,
        price,
        quality,
        dateBuy: new Date(),
        shipping: shipping,
      };
    });
    history.push("/pay");

    // fetchPostData('/api/receipt', { data: data, accountCode: user.ACCOUNTCODE }).then((re) => {
    // })
    // const action = removeAll([]);
    // console.log('d');
    // dispatch(action)
  };
  const onChange = (e) => {
    setShopping(e.value);
  };
  return (
    <form className="form__cart">
      <div className="cart__list--pay">
        <h1>Thanh toán</h1>

        <div className="cart__list--pay-top">
          <p>
            {" "}
            Số lượng sản phẩm: <span>{totalItem}</span>
          </p>
          {/* <p>$9999</p> */}
        </div>

        <div className="cart__list--pay-bottom">
          <p>
            Tổng: <span>{totalPrice} VND</span>
          </p>
          <button onClick={onSubmit}>Thanh toán</button>
        </div>
      </div>
    </form>
  );
}

CartListPay.propTypes = {};

export default CartListPay;
