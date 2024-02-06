import React, { useState } from "react";
import PropTypes from "prop-types";
import InputField from "../../../../../../custom-field/InputField";
import "./style.css";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { fetchPutData } from "./../../../../../../commons/fetchData";
import { useCookies } from "react-cookie";
import readCookie from "../../../../../../commons/readCookie";

function ManageUserInfor(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["dataUser"]);
  const inforUser = readCookie(cookies.dataUser);
  const [email, setEmail] = useState(inforUser?.EMAIL);
  const [phone, setPhone] = useState(inforUser?.PHONE);
  const [address, setAddress] = useState(inforUser?.ADDRESS);
  console.log(inforUser);
  const onChange = (setValue, e) => {
    setValue(e.target.value);
    // console.log(email, phone, address);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      phone: phone,
      address: address,
      accountCode: inforUser.ACCOUNTCODE,
    };
    fetchPutData("/api/user", data).then((re) => {
      let ck = `NAMELOGIN=${inforUser.NAMELOGIN}+PASSWORD=${inforUser.PASSWORD}+ACCOUNTCODE=${inforUser.ACCOUNTCODE}+EMAIL=${re.email}+ADDRESS=${re.address}+PHONE=${re.phone}+PERMISSION=${inforUser.PERMISSION}`;
      setCookie("dataUser", ck, { path: "/user" });
      console.log(readCookie(cookies.dataUser));
    });
  };

  console.log(inforUser);
  return (
    <div>
      <form className="infor-form">
        <div className="infor-from-name">
          <p>Login name : </p>
          <p>{inforUser.NAMELOGIN}</p>
        </div>
        <InputField
          label="Email:"
          value={email}
          onChange={(e) => onChange(setEmail, e)}
        />
        <InputField
          label="Phone:"
          value={phone}
          onChange={(e) => onChange(setPhone, e)}
        />
        <InputField
          label="Address:"
          value={address}
          onChange={(e) => onChange(setAddress, e)}
        />
        <Button variant="outlined" onClick={onSubmit}>
          save
        </Button>
      </form>
    </div>
  );
}

ManageUserInfor.propTypes = {};

export default ManageUserInfor;
