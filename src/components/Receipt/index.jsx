import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import logo from "../../assets/images/logo.png";
import produce from "../../assets/images/product0.png";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
function Receipt(props) {
  const { isReceipt, setIsReceipt, receiptCode, setReceiptCode } = props;
  const receipt = useSelector((state) => state.receipt.data);
  const product = useSelector((state) => state.product.data);
  const user = useSelector((state) => state.user.data);

  const dataReceipt =
    receiptCode === "" || receiptCode === null || receiptCode === undefined
      ? ""
      : receipt.find((element) => element.RECEIPTCODE === receiptCode);
  console.log(dataReceipt);
  const dataProduct =
    receiptCode === "" || receiptCode === null || receiptCode === undefined
      ? ""
      : product.find(
          (element) => element.PRODUCTCODE === dataReceipt.PRODUCTCODE
        );
  console.log(dataProduct);
  console.log(setReceiptCode);
  const handleClose = () => {
    setReceiptCode("");
    setIsReceipt(false);
  };
  return (
    <div
      className="receipt"
      style={{
        display: isReceipt ? "unset" : "none",
      }}
    >
      <div className="container">
        <FaTimes className="receipt-close" onClick={handleClose} />

        <div className="receipt-top">
          <img src={logo} alt="" className="receipt-top-logo" />
        </div>
        <div className="receipt-content">
          <div className="receipt-content-img">
            <img
              src={`data:image/gif;base64,${
                receiptCode === "" ||
                receiptCode === null ||
                receiptCode === undefined
                  ? ""
                  : dataProduct.IMGARR[0].src
              }`}
              alt=""
            />
          </div>
          <div className="receipt-content-infor">
            <p>
              Product Name :{" "}
              {receiptCode === "" ||
              receiptCode === null ||
              receiptCode === undefined
                ? ""
                : dataProduct.PRODUCTNAME}
            </p>
            <p>
              Product Name :{" "}
              {receiptCode === "" ||
              receiptCode === null ||
              receiptCode === undefined
                ? ""
                : dataProduct.PRODUCTNAME}
            </p>
            <p>
              {" "}
              Mã hóa đơn :{" "}
              {receiptCode === "" ||
              receiptCode === null ||
              receiptCode === undefined
                ? ""
                : dataReceipt.RECEIPTCODE}
            </p>
            <p>
              Quantities :{" "}
              {receiptCode === "" ||
              receiptCode === null ||
              receiptCode === undefined
                ? ""
                : dataReceipt.QUALITY}
            </p>
            <p>
              Trạng thái thanh toán :
              {receiptCode === "" ||
              receiptCode === null ||
              receiptCode === undefined
                ? ""
                : dataReceipt.STATUS}
            </p>
            <p>
              Thời gian mua :{" "}
              {receiptCode === "" ||
              receiptCode === null ||
              receiptCode === undefined
                ? ""
                : dataReceipt.TIMEORDER}
            </p>
            {receiptCode ||
            dataReceipt.TIMECONFIRM === "" ||
            receiptCode === null ||
            receiptCode === undefined ||
            receiptCode === null ? (
              receiptCode === ""
            ) : (
              <p> Time Comfirmed : {dataReceipt.TIMECONFIRM}</p>
            )}
            {receiptCode ||
            dataReceipt.TIMERECEIVED === "" ||
            receiptCode === null ||
            receiptCode === undefined ||
            receiptCode === null ? (
              receiptCode === ""
            ) : (
              <p>Thời gian nhận : {dataReceipt.TIMERECEIVED}</p>
            )}
            <p>
              Trạng thái giao hàng :{" "}
              {receiptCode === "" ||
              receiptCode === null ||
              receiptCode === undefined
                ? ""
                : dataReceipt.SHIPPING}
            </p>
            {receiptCode === "" ||
            receiptCode === null ||
            receiptCode === undefined ||
            dataReceipt.DISCOUNT === null ? (
              ""
            ) : (
              <p>discount: {dataReceipt.DISCOUNT}%</p>
            )}
          </div>
        </div>

        <div className="receipt-total">
          <h1>
            Tổng tiền :{" "}
            <span>{dataReceipt.QUALITY * dataProduct.PRICE} VND</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

Receipt.propTypes = {};

export default Receipt;
