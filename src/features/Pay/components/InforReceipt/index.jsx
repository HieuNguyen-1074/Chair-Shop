import React from "react";
import "./style.scss";
import CartListItem from "../../../../components/Cart/components/CartList/components/CartListItem";

export default function InforRecipt() {
  const dataPayinCart = localStorage.getItem("cart");
  return (
    <div>
      <h2> Sản phẩm</h2>
      {dataPayinCart &&
        JSON.parse(dataPayinCart).map((item, index) => {
          const { src, discount, rate, nameProduct, id, price, quality } = item;
          return (
            <CartListItem
              isInPay={true}
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
        })}
      <div className="pay__total">
        <p>
          Tổng số gế :{" "}
          {dataPayinCart?.length > 0 &&
            JSON.parse(dataPayinCart).reduce((number, item) => {
              return (number += item.quality);
            }, 0)}
        </p>
        <p>
          Tổng giá tiền :{" "}
          {dataPayinCart?.length > 0 &&
            JSON.parse(dataPayinCart).reduce((number, item) => {
              return (number += item?.quality * item?.price);
            }, 0)}{" "}
          $
        </p>
      </div>
    </div>
  );
}
