import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import logo from "../../../../../../../../assets/images/logo.png";
import { TextField } from "@material-ui/core";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import SelectField from "../../../../../../../../custom-field/SelectField";
import Select from "react-select";
import { fetchGetData } from "../../../../../../../../commons/fetchData";
import SelectMateral from "../../../../../../../../custom-field/SelectField/SelectMateral";

function UpdateRight(props) {
  const {
    newProductName,
    newQuantities,
    newHeight,
    newPrice,
    newColor,
    newWidth,
    newDiscount,
    idUpdate,
    isSee,
    newMaterial,
    newDes,
    newCategory,
    setNewHeight,
    setNewColor,
    setNewDiscount,
    setNewPrice,
    setNewProductName,
    setNewQuantities,
    setNewWidth,
    setNewMaterial,
    setNewDes,
    setNewCategory,
  } = props;
  const [category, setListCategory] = useState([]);
  console.log(newCategory);
  useEffect(() => {
    fetchGetData("/api/category").then((result) => {
      setListCategory(result);
    });
  }, []);

  const onChangeProductName = (e) => {
    setNewProductName(e.target.value);
  };

  const onChangeDiscount = (e) => {
    setNewDiscount(e.target.value);
  };

  const onChangePrice = (e) => {
    setNewPrice(e.target.value);
  };

  const onChangeWidth = (e) => {
    setNewWidth(e.target.value);
  };
  const onChangeDes = (e) => {
    setNewDes(e.target.value);
  };

  const onChangeMaterial = (e) => {
    setNewMaterial(e.target.value);
  };

  const onChangeCategory = (e) => {
    setNewCategory(e.target.value);
  };

  const onChangeHeight = (e) => {
    setNewHeight(e.target.value);
  };

  const onChangeColor = (e) => {
    setNewColor(e.target.value);
  };

  const onChangeQuantities = (e) => {
    setNewQuantities(e.target.value);
  };

  return (
    <div>
      <form className="product-form">
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={newProductName}
          onChange={onChangeProductName}
          autoFocus
          size="small"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          id="quantities"
          label="Quantities"
          name="quantities"
          value={newQuantities}
          onChange={onChangeQuantities}
          autoFocus
          size="small"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          type="number"
          fullWidth
          id="price"
          label="Price"
          name="price"
          value={newPrice}
          onChange={onChangePrice}
          autoFocus
          size="small"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="width"
          label="Width"
          name="width"
          value={newWidth}
          onChange={onChangeWidth}
          autoFocus
          size="small"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="height"
          label="Height"
          name="height"
          value={newHeight}
          onChange={onChangeHeight}
          autoFocus
          size="small"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="color"
          label="Color"
          name="color"
          value={newColor}
          onChange={onChangeColor}
          autoFocus
          size="small"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="material"
          label="Material"
          name="material"
          value={newMaterial}
          onChange={onChangeMaterial}
          autoFocus
          size="small"
        />

        <SelectMateral
          className="select-category"
          placeholder={"Category"}
          label={"Category"}
          options={category.map((item) => {
            return item?.CATEGORYNAME;
          })}
          handleChange={onChangeCategory}
          value={newCategory}
          defaultVal={newCategory}
          size="b"
        />
        <textarea
          placeholder="Enter decription"
          name=""
          id=""
          value={newDes}
          onChange={onChangeDes}
          cols="30"
          rows="10"
        ></textarea>
      </form>
    </div>
  );
}

UpdateRight.propTypes = {};

export default UpdateRight;
