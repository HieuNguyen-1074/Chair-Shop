import React, { useState } from "react";
import "./style.scss";
import InputField from "../../../../custom-field/InputField";

export default function InforShip(props) {
  const { number, setNumber, address, setAddress, email, setEmail } = props;
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Thông tin thanh toán</h2>
      <InputField
        name="name"
        type="text"
        placeholder="Nhập tên nhận hàng"
        label="Tên"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <InputField
        name="address"
        type="text"
        placeholder="Nhập địa chỉ giao hàng"
        label="Địa chỉ "
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <InputField
        name="number"
        type="text"
        placeholder="Nhập số điện thoại"
        label="Số điện thoại "
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <InputField
        name="email"
        type="text"
        placeholder="Nhập tài khoản email"
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </div>
  );
}
