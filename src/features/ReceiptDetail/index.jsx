import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import Footer from "../../components/Footer";
import "./style.css";
import InputField from "../../custom-field/InputField";
import { fetchPutData } from "../../commons/fetchData";
import Refund from "./components/Refund";
import TableDetail from "./components/TableDetail";
import SelectField from "../../custom-field/SelectField";
import * as dayjs from "dayjs";
import readCookie from "../../commons/readCookie";
import { useCookies } from "react-cookie";

export default function ReceiptDetail() {
  let { receiptCode } = useParams();
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["dataUser"]);
  const user = readCookie(cookies.dataUser);
  console.log(user);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let receipt = useSelector((state) => state.receipt.data).find(
    (receipt) => receipt.RECEIPTCODE === receiptCode
  );
  let product = useSelector((state) => state.product.data);
  let receiptDetail = receipt?.DETAIL?.map((item) => {
    return {
      ...item,
      productInfor: product.find(
        (element) => element.PRODUCTCODE === item.PRODUCTCODE
      ),
    };
  });
  console.log(receiptDetail);
  const [address, setAddress] = useState(receipt?.ADDRESS);
  const [phone, setPhone] = useState(receipt?.PHONE);
  const [resson, setResson] = useState("");
  const [status, setStatus] = useState("");
  const [shipping, setShipping] = useState("");
  useEffect(() => {
    setAddress(receipt?.ADDRESS);
    setPhone(receipt?.PHONE);
    setStatus(receipt?.STATUS);
    setShipping(receipt?.SHIPPING);
  }, [receipt]);

  const onChangePhone = (e) => {
    setPhone(e.target.value);
    fetchPutData("");
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const onChangeResson = (e) => {
    setResson(e.target.value);
  };
  const handleChangeInforShip = async () => {
    const dataInforChange = {
      receiptCode: receipt.RECEIPTCODE,
      phone: phone,
      address: address,
    };
    await fetchPutData("/api/receipt/change-infor-ship", dataInforChange).then(
      (res) => {
        window.location.reload();
      }
    );
  };

  const handleRequestRefund = async () => {
    const dataInforChange = {
      receiptCode: receipt.RECEIPTCODE,
      resson: resson,
      status: "Return",
    };
    await fetchPutData("/api/receipt/request-refund", dataInforChange).then(
      (res) => {
        setOpen(false);
        window.location.reload();
      }
    );
  };
  const onChangeStatus = async (e) => {
    await fetchPutData("/api/receipt/change-status", {
      receiptCode: receipt?.RECEIPTCODE,
      status: e.target.value,
    }).then(() => {
      setStatus(e.target.value);
    });
  };
  const onChangeShipping = async (e) => {
    await fetchPutData("/api/receipt/change-shipping", {
      receiptCode: receipt?.RECEIPTCODE,
      shipping: e.target.value,
    }).then(() => {
      setShipping(e.target.value);
    });
  };
  const cancelReceipt = async () => {
    await fetchPutData("/api/receipt/change-status", {
      receiptCode: receipt?.RECEIPTCODE,
      status: "Cancel",
    }).then(() => {
      setStatus("Cancel");
    });
    await fetchPutData("/api/receipt/change-shipping", {
      receiptCode: receipt?.RECEIPTCODE,
      shipping: "Cancel",
    }).then(() => {
      window.location.reload();
      setShipping("Cancel");
    });
  };

  return (
    <div>
      {user.PERMISSION === "USER" ? <Header /> : ""}

      <div className="detail-container">
        <div className="infor">
          <b>Mã hóa đơn: {receipt?.RECEIPTCODE}</b>
          <b>Tổng tiền: {receipt?.TOTALPRICE} VND</b>
          <b>
            Thời gian tạo:{" "}
            {dayjs(receipt?.TIMEORDER).format("DD/MM/YYYY HH:MM")}
          </b>
          <b>
            trạng thái thanh toán: {status}
            {user.PERMISSION === "ADMIN" && (
              <FormControl
                className="infor__bottom"
                size="small"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="demo-simple-select-label">
                  Trạng thái thanh toán
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status pay"
                  onChange={onChangeStatus}
                >
                  <MenuItem value={"Payed"}>Đã trả</MenuItem>
                  <MenuItem value={"Not pay"}>Chưa trả</MenuItem>
                  <MenuItem value={"Return"}>Hoàn trả </MenuItem>
                  <MenuItem value={"Accept return"}>
                    Chấp nhận hoàn trả
                  </MenuItem>
                  <MenuItem value={"Cancel"}>Hủy</MenuItem>
                </Select>
              </FormControl>
            )}
          </b>
          <b>
            Trạng thái giao hàng: {shipping}
            {user.PERMISSION === "ADMIN" && (
              <FormControl
                className="infor__bottom"
                fullWidth
                size="small"
                variant="outlined"
              >
                <InputLabel id="demo-simple-select-label">
                  Trạng Thái giao hàng
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={shipping}
                  label="Shipping"
                  onChange={onChangeShipping}
                >
                  <MenuItem value={"Perpare"}>Chuẩn bị</MenuItem>
                  <MenuItem value={"In way"}>Đang giao</MenuItem>
                  <MenuItem value={"Done"}>Hoàn thành</MenuItem>
                  <MenuItem value={"Cancel"}>Hủy</MenuItem>
                </Select>
              </FormControl>
            )}
          </b>
        </div>
        {user?.PERMISSION === "ADMIN" && status === "Return" && (
          <Refund receipt={receipt} setStatus={setStatus} />
        )}
        <div className="detail__change">
          <div>
            <InputField
              name="phone"
              type="text"
              placeholder="Enter  phone"
              label=" Số điện thoại"
              value={phone}
              onChange={onChangePhone}
            />
            <InputField
              name="address"
              type="text"
              placeholder="Enter address"
              label=" Địa chỉ"
              value={address}
              onChange={onChangeAddress}
            />
          </div>
          <Button
            variant="contained"
            disabled={shipping !== "Perpare"}
            onClick={handleChangeInforShip}
            color="primary"
          >
            Thay đổi
          </Button>
        </div>
        <TableDetail receiptDetail={receiptDetail} />
        <div class="detail__list--btn">
          <div>
            {user.PERMISSION === "USER" &&
              status === "Payed" &&
              shipping === "Perpare" && (
                <Button
                  size="large"
                  variant="contained"
                  onClick={handleClickOpen}
                  color="primary"
                >
                  Yêu cầu hủy đơn
                </Button>
              )}

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Lý Do hủy đơn </DialogTitle>
              <DialogContent>
                <InputField
                  name="refund"
                  type="text"
                  placeholder="Lý do"
                  label="Lý do"
                  value={resson}
                  onChange={onChangeResson}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClose}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRequestRefund}
                >
                  Gửi
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          {user.PERMISSION === "USER" &&
            receipt?.STATUS === "Not pay" &&
            receipt?.SHIPPING === "Perpare" && (
              <Button
                onClick={cancelReceipt}
                size="large"
                variant="contained"
                color="primary"
              >
                Hủy
              </Button>
            )}
          {/* {receipt?.STATUS === "Payed" && receipt?.SHIPPING === "Done" && (
            <Button size="large" variant="contained" color="primary">
              Make new order
            </Button>
          )} */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
