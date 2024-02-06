import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductLeft from "./components/ProductLeft";
import ProductRight from "./components/ProductRight";
import "./style.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchGetData } from "../../../../commons/fetchData";
import { setCateGoryList } from "../../../../redux/SliceCategory";

function ProductMain(props) {
  const { search } = props;
  let history = useHistory();
  console.log(search, "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");

  const key = search;
  const [category, setListCategory] = useState([]);
  const [changeData, setChange] = useState(false);
  useEffect(() => {
    fetchGetData("/api/category").then((result) => {
      const action = setCateGoryList(result);

      setListCategory(result);
    });
  }, []);

  const products = useSelector((state) => state.product.data);

  let dataProduct = products.find((item) => item.PRODUCTCODE === key);

  dataProduct = {
    ...dataProduct,
    categoryName: category.find(
      (e) => e.CATEGORYCODE === dataProduct.CATEGORYID
    )?.CATEGORYNAME,
  };
  const imgArr = dataProduct === undefined ? [] : dataProduct.IMGARR;
  return (
    <div className="main">
      <ProductLeft imgArr={imgArr ? imgArr : []} />
      <ProductRight dataProduct={dataProduct} />
    </div>
  );
}

ProductMain.propTypes = {};

export default ProductMain;
