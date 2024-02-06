import React from "react";
import PropTypes from "prop-types";

import "./style.css";

import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

import { RiShoppingCart2Line } from "react-icons/ri";
import { addCart } from "../../redux/SliceCart";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { addAlert } from "../../redux/SlideAlert";

function ItemProduct(props) {
  const {
    src,
    discount,
    name,
    rate,
    id,
    price,
    admin,
    handleClick,
    handleDelete,
  } = props;
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.data);
  const history = useHistory();

  const handleView = () => {
    history.push(`/product?${id}`);
  };

  let rateComponent = [];
  for (let index = 0; index <= 5; index++) {}
  const handleAddToCart = () => {
    const data = {
      src: src,
      discount: discount,
      rate: rate,
      nameProduct: name,
      id: id,
      price: price,
      quality: 1,
    };
    const action = addCart(data);
    if (cartList.find((element) => element.id === data.id) === undefined) {
      dispatch(action);
      dispatch(
        addAlert({
          type: "success",
          massage: "Thành công",
        })
      );
    } else {
      dispatch(
        addAlert({
          type: "error",
          massage: "Sản phẩm đã có trong giỏ hàng",
        })
      );
    }
  };
  return (
    <div className="product__item">
      <div className="product__item--img" onClick={handleView}>
        <img src={src} alt="" />
      </div>
      {/* <p></p> */}
      <div className="product__item--infor">
        <h1>{name}</h1>
        <div style={{ fontSize: "12px" }} className="product__item--infor-rate">
          Danh mục: {props?.categoryName}
        </div>
        <div className="product__item--infor-bottom">
          <h1>{price} VND</h1>
          {admin ? (
            <React.Fragment>
              <AiOutlineEye onClick={(e) => handleClick(id)} />
              <AiFillDelete onClick={(e) => handleDelete(id)} />
            </React.Fragment>
          ) : (
            <RiShoppingCart2Line onClick={handleAddToCart} />
          )}
        </div>
      </div>
    </div>
  );
}

ItemProduct.propTypes = {};

export default ItemProduct;
