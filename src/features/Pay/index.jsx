import React, { useState } from "react";
import "./style.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InforShip from "./components/InforShip";
import InforRecipt from "./components/InforReceipt";
import { Button } from "@material-ui/core";
import { fetchPostData } from "../../commons/fetchData";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Pay() {
  const user = useSelector((state) => state?.user?.data);
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const dataPayinCart = localStorage.getItem("cart");
  const [isPay, setIsPay] = useState(false);
  useEffect(() => {
    setAddress(user.ADDRESS);
    setNumber(user?.PHONE);
    setEmail(user?.EMAIL);
  }, []);

  const handlePay = async (isPay1, isp) => {
    const dataInPay = {
      bankCode: "",
      amount: JSON.parse(dataPayinCart).reduce((number, item) => {
        number += item?.quality * item?.price;
        return number;
      }, 0),
      language: "vn",
      dataPay: {
        dateBuy: new Date().toISOString(),
        status: "Not pay",
        address: address,
        phone: number,
        accountCode: user.ACCOUNTCODE,
        totalPrice: JSON.parse(dataPayinCart).reduce((number, item) => {
          number += item?.quality * item?.price;
          return number;
        }, 0),
        dataProduct: JSON.parse(dataPayinCart).map((item) => {
          return {
            productCode: item?.id,
            quantity: item?.quality,
            price: item?.price,
          };
        }),
      },
    };
    await fetchPostData("/api/vnpay/create_payment_url", { dataInPay })
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((response) => {
        localStorage.removeItem("cart");
        isp
          ? window.open(response?.urlPay, "_self")
          : window.open("/user", "_self");
      });
  };
  return (
    <div>
      <Header />
      <div className="payment">
        <InforShip
          number={number}
          setNumber={setNumber}
          address={address}
          setAddress={setAddress}
          email={email}
          setEmail={setEmail}
        />
        <InforRecipt />
      </div>
      <div className="payment__pay--btn">
        <div style={{ display: "flex", gap: "40px" }}>
          <Button
            onClick={(e) => {
              setIsPay(true);
              handlePay(e, true);
            }}
            variant="contained"
            size="large"
            color="primary"
          >
            Thanh toán hóa đơn
          </Button>
          <Button
            onClick={(e) => {
              setIsPay(false);
              handlePay(e, false);
            }}
            variant="contained"
            size="large"
            color="primary"
          >
            Tạo hóa đơn
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
