import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UpdateLeft from "./components/UpdateLeft";
import UpdateRight from "./components/UpdateRight";
import "./style.scss";
import { FaTimes } from "react-icons/fa";
import logo from "../../../../../../assets/images/logo.png";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteData,
  fetchGetData,
  fetchPostData,
} from "../../../../../../commons/fetchData";
import { fetchPutData } from "./../../../../../../commons/fetchData";
import { getProduct } from "../../../../../../redux/SliceProduct";
function Update(props) {
  const { isSee, setIsSee, idUpdate, status } = props;
  const product = useSelector((state) => state.product.data);
  const dispatch = useDispatch();
  const data =
    idUpdate === "" || null || undefined
      ? {}
      : product.find((element) => element.PRODUCTCODE === idUpdate);
  const [imgAdd, setImgAdd] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);
  const [newArrImg, setNewArrImg] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newQuantities, setNewQuantities] = useState();

  const [newHeight, setNewHeight] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newColor, setNewColor] = useState();
  const [newWidth, setNewWidth] = useState();
  const [newDiscount, setNewDiscount] = useState();
  const [newDes, setNewDes] = useState("");
  const [newCategory, setNewCategory] = useState();
  const [newMaterial, setNewMaterial] = useState();
  const [category, setListCategory] = useState([]);

  useEffect(() => {
    fetchGetData("/api/category").then((result) => {
      setListCategory(result);
    });
    const arrImg = Object.keys(data).length === 0 ? [] : data.IMGARR;
    const productName = Object.keys(data).length === 0 ? "" : data.PRODUCTNAME;
    const quantities = Object.keys(data).length === 0 ? "" : data.QUANTITIES;
    const height = Object.keys(data).length === 0 ? "" : data.HEIGHT;
    const price = Object.keys(data).length === 0 ? "" : data.PRICE;
    const color = Object.keys(data).length === 0 ? "" : data.COLOR;
    const width = Object.keys(data).length === 0 ? "" : data.WIDTH;
    const discount = Object.keys(data).length === 0 ? "" : data.DISCOUNT;
    const des = Object.keys(data).length === 0 ? "" : data.DESCRIPTION;

    const categoryCode =
      Object.keys(data).length === 0
        ? ""
        : category.find((item) => item?.CATEGORYCODE === data.CATEGORYID)
            ?.CATEGORYNAME;
    const material = Object.keys(data).length === 0 ? "" : data.MATERIAL;
    if (status === "create") {
      setImgAdd([]);
      setNewArrImg([]);
      setNewColor("");
      setNewDiscount("");
      setNewHeight("");
      setNewPrice("");
      setNewProductName("");
      setNewQuantities("");
      setNewWidth("");
      setNewDes("");
      setNewCategory("");
      setNewMaterial("");
    } else {
      setNewArrImg(arrImg);
      setNewProductName(productName);
      setNewQuantities(quantities);
      setNewHeight(height);
      setNewPrice(price);
      setNewColor(color);
      setNewWidth(width);
      setNewDiscount(discount);
      setNewDes(des);
      setNewCategory(categoryCode);
      setNewMaterial(material);
    }
    return () => {};
  }, [isSee]);

  const handlePostSubmit = (e) => {
    // dataDelete.forEach(element => {
    //     fetchDeleteData(`api/product/img/${element}`);
    // })
    // imgAdd.map((element) => {
    //     fetchPostData('/api/product/img', { src: element })
    // })
    const dataInput = {
      newColor,
      newDiscount,
      newHeight,
      newPrice,
      newProductName,
      newQuantities,
      newWidth,
      newDes,
      newCategory: category.find((item) => item?.CATEGORYNAME === newCategory)
        .CATEGORYCODE,
      newMaterial,
    };

    const dataPost = {
      dataInput: dataInput,
      dataImg: imgAdd,
    };
    console.log(dataPost);
    // console.log(dataPost);
    fetchPostData("/api/product", dataPost).then(() => {
      fetchGetData("/api/product").then((result) => {
        const action = getProduct(result);
        dispatch(action);
        setIsSee(false);
      });
    });
    // setTimeout(() => {
    //   fetchGetData("/api/product").then((result) => {
    //     const action = getProduct(result);
    //     dispatch(action);
    //   });
    // }, 1500);
  };
  const handleClose = () => {
    setIsSee(false);
    setDataDelete([]);
  };
  const handlePutSubmit = (e) => {
    const dataInput = {
      newColor,
      newDiscount,
      newHeight,
      newPrice,
      newProductName,
      newQuantities,
      newWidth,
      newDes,
      newCategory: category.find((item) => item?.CATEGORYNAME === newCategory)
        .CATEGORYCODE,
      newMaterial,
    };

    const dataPut = {
      dataInput: dataInput,
      dataImg: imgAdd,
      dataDelete: dataDelete,
    };
    fetchPutData(`/api/product/${idUpdate}`, dataPut).then(() => {
      fetchGetData("/api/product").then((result) => {
        const action = getProduct(result);
        dispatch(action);
        setIsSee(false);
      });
    });
  };
  return (
    <div
      className="addmin-update"
      style={{
        display: isSee ? "" : "none",
      }}
    >
      <div className="container">
        <div className="addmin-update-top">
          <FaTimes className="receipt-close" onClick={handleClose} />

          <div className="receipt-top">
            <img src={logo} alt="" className="receipt-top-logo" />
          </div>
        </div>
        <div className="addmin-update-content">
          <UpdateLeft
            // dataImg={dataImg}
            // setDataImg={setDataImg}
            dataDelete={dataDelete}
            setDataDelete={setDataDelete}
            imgAdd={imgAdd}
            setImgAdd={setImgAdd}
            setNewArrImg={setNewArrImg}
            newArrImg={newArrImg}
            idUpdate={status === "update" ? idUpdate : null}
            isSee={isSee}
          />
          {isSee && (
            <UpdateRight
              newProductName={newProductName}
              setNewProductName={setNewProductName}
              newDiscount={newDiscount}
              setNewDiscount={setNewDiscount}
              newPrice={newPrice}
              setNewPrice={setNewPrice}
              newWidth={newWidth}
              setNewWidth={setNewWidth}
              newHeight={newHeight}
              setNewHeight={setNewHeight}
              newColor={newColor}
              setNewColor={setNewColor}
              newQuantities={newQuantities}
              setNewQuantities={setNewQuantities}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              newDes={newDes}
              setNewDes={setNewDes}
              newMaterial={newMaterial}
              setNewMaterial={setNewMaterial}
              idUpdate={idUpdate}
              isSee={isSee}
            />
          )}
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="outlined"
            style={{
              textAlign: "center",
            }}
            onClick={status === "create" ? handlePostSubmit : handlePutSubmit}
          >
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
}

Update.propTypes = {};

export default Update;
