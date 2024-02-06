import React, { useState } from "react";
import Header from "../../components/Header";
import ListProduct from "./components/ListProduct";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import "./style.css";
export default function List(props) {
  const products = useSelector((state) => state.product.data);
  const categorys = useSelector((state) => state.category.data);
  const {
    userName,
    handleLogin,
    isLogin,
    setIsLogin,
    setCookie,
    removeCookie,
  } = props;
  const [searchKeyName, setSearchKeyName] = useState("");
  const [category, setCategory] = useState("none");
  return (
    <div>
      <Header
        userName={userName}
        handleLogin={handleLogin}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setCookie={setCookie}
        removeCookie={removeCookie}
      />
      <FormControl className="header-filter-form" size="small">
        <div className="header-filter">
          <TextField
            id="outlined-basic"
            onChange={(val) => setSearchKeyName(val.target.value)}
            value={searchKeyName}
            size="small"
            label="Tìm kiến theo tên"
            variant="outlined"
          />

          <div>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              variant="outlined"
              className="select-filter-main"
              label="Age"
              onChange={(val) => setCategory(val.target.value)}
              value={category}
            >
              <MenuItem className="select-filter" value={"none"}>
                Tất cả
              </MenuItem>
              {categorys.map((item) => {
                return (
                  <MenuItem className="select-filter" value={item.CATEGORYCODE}>
                    <img src={`data:image/png;base64,${item.IMG.src}`} />{" "}
                    {item.CATEGORYNAME}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </div>
      </FormControl>
      <ListProduct
        list={products
          .filter((item) => {
            return (
              searchKeyName.trim() === "" ||
              item.PRODUCTNAME.toLocaleLowerCase().indexOf(
                searchKeyName.toLocaleLowerCase()
              ) !== -1
            );
          })
          .filter(
            (item) => category === "none" || item.CATEGORYID === category
          )}
      />
    </div>
  );
}
