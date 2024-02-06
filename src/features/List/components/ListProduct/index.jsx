import React from "react";
import { useSelector } from "react-redux";
import ItemProduct from "../../../../components/ItemProduct";

export default function ListProduct({ list }) {
  const category = useSelector((state) => state.category.data);
  return (
    <div className="product-list">
      {list.map((item, index) => {
        const objectConvert = {};
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
    </div>
  );
}
