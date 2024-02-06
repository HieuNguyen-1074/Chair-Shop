import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsStar, BsStarFill } from "react-icons/bs";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./style.css";
import { AiOutlinePlus } from "react-icons/ai";
import { GrSubtract } from "react-icons/gr";
import { addCart } from "../../../../../../redux/SliceCart";
import { useDispatch, useSelector } from "react-redux";
import readCookie from "../../../../../../commons/readCookie";
import { useCookies } from "react-cookie";

function ProductRight(props) {
  const { dataProduct } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["dataUser"]);
  const user = readCookie(cookies.dataUser);
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.data);
  const [quantities, setQuantities] = useState(1);

  let rateComponent = [];

  const PRICE = dataProduct ? dataProduct.PRICE : 0;
  const PRODUCTNAME = dataProduct ? dataProduct.PRODUCTNAME : "";
  const PRODUCTCODE = dataProduct ? dataProduct.PRODUCTCODE : "";
  const DISCOUNT = dataProduct ? dataProduct.DISCOUNT : "";
  const IMGARR = dataProduct ? dataProduct.IMGARR : [];
  const QUANTITIES = dataProduct ? dataProduct.QUANTITIES : 0;
  const RATE = dataProduct ? dataProduct.RATE : 0;
  const COLOR = dataProduct ? dataProduct.COLOR : "";
  const WIDTH = dataProduct ? dataProduct.WIDTH : "";
  const HEIGHT = dataProduct ? dataProduct.HEIGHT : "";
  const CATEGORYNAME = dataProduct ? dataProduct.categoryName : "";
  const MATERIAL = dataProduct ? dataProduct.MATERIAL : "";
  for (let index = 0; index <= 5; index++) {
    rateComponent.push(
      index >= RATE ? (
        <BsStar />
      ) : (
        <BsStarFill
          style={{
            color: "#ed6c63",
          }}
        />
      )
    );
  }
  const handleAddCart = () => {
    const data = {
      src: `data:image/gif;base64,${IMGARR[0].src}`,
      discount: DISCOUNT,
      rate: RATE,
      nameProduct: PRODUCTNAME,
      id: PRODUCTCODE,
      price: PRICE,
      quality: quantities,
    };
    const action = addCart(data);
    cartList.find((element) => element.id === data.id) === undefined
      ? dispatch(action)
      : console.log("object");
  };
  const handleOnClick = (action) => {
    switch (action) {
      case "increase":
        quantities + 1 === QUANTITIES
          ? alert("quas")
          : setQuantities(quantities + 1);
        break;
      case "reduce":
        quantities - 1 === 0 ? alert("quas") : setQuantities(quantities - 1);
        break;
      default:
        break;
    }
  };
  return (
    <div className="main-right">
      <div className="main-right-top">
        <h1>{PRODUCTNAME}</h1>
        <div className="rating">{CATEGORYNAME}</div>
      </div>
      <div className="main-right-next">
        <div className="price">
          <h1>Giá</h1>
          <p>{PRICE} VND</p>
        </div>
        <div className="quality">
          <h1>Số lượng</h1>
          <div className="quality-main">
            <GrSubtract
              className="quality-main-icon"
              onClick={() => handleOnClick("reduce")}
            />

            <h1>{quantities}</h1>
            <AiOutlinePlus
              className="quality-main-icon"
              onClick={() => handleOnClick("increase")}
            />
          </div>
        </div>
      </div>
      <TableContainer className="detail" component={Paper}>
        <h1>Chi tiết</h1>
        <Table aria-label="simple table" size="small">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Chiều rộng
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {WIDTH}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Chiều cao
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {HEIGHT}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Màu
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {COLOR}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Số lượng
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {QUANTITIES}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Chất liệu
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {MATERIAL}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {user?.PERMISSION !== "ADMIN" && (
        <div className="bottom">
          <div className="total">
            <h1>Tổng tiền</h1>
            <p>{quantities * PRICE} VND</p>
          </div>
          <button onClick={handleAddCart}>Thêm vào giỏ hàng</button>
        </div>
      )}
    </div>
  );
}

ProductRight.propTypes = {};

export default ProductRight;
