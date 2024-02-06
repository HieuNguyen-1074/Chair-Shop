import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import TopTab from "./../../../../components/TopTab/index";
import ManageList from "./components/index";
import BoxChat from "../../../../components/BoxChat";
import { io } from "socket.io-client";
import readCookie from "../../../../commons/readCookie";
import { useCookies } from "react-cookie";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { fetchDeleteData, fetchPutData } from "../../../../commons/fetchData";
function ManageChat(props) {
  const { userSend, setUserSend } = props;
  const { isBox, setIsBox } = props;
  const [isSee, setIsSee] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");

  const [sortByPrice, setSortByPrice] = useState("");
  const [status, setStatus] = useState("");
  const [listUser, setListUser] = useState([]);
  const sortOptionPrice = ["All", "Online", "Offline"];
  const [cookies, setCookie, removeCookie] = useCookies(["dataUser"]);
  const [newPass, setNewPass] = useState("");
  const user = readCookie(cookies.dataUser)
    ? readCookie(cookies.dataUser)
    : JSON.parse(localStorage.getItem("dataUser"));
  const refio = useRef();
  const [open, setOpen] = useState(false);
  let socket;
  const [search, setSearch] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit2 = () => {
    fetchPutData("/api/user/reset", {
      accountCode: userSend?.ACCOUNTCODE,
      newPass: newPass,
    }).then((res) => {
      refio.current.emit("admin", "");
      setOpen(false);
    });
  };
  const handleOnChangeInput = (e) => {
    setValueSearch(e.target.value);
  };
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    socket = io("http://localhost:3000/", {
      path: "/api/socket/",
      query: {
        ACCOUNTCODE: user?.ACCOUNTCODE,
      },
    });
    refio.current = socket;
    socket.on("connection", () => {});
    user?.PERMISSION === "ADMIN" &&
      socket.on("admin", (res) => {
        setListUser(res);
      });
  }, []);

  const sortOption = [
    {
      title: "Status",
      value: sortByPrice,
      options: sortOptionPrice,
      handleOnChange: (e) => {
        setSortByPrice(e.target.value);
      },
    },
  ];
  const buttons = [
    {
      name: "Chat",
      onClick: function (e, data) {
        console.log(data);
        setUserSend(data);
        setIsBox(true);
      },
    },
    {
      name: "Delete",
      onClick: async function (e, data) {
        setUserSend(data);
        setTimeout(() => {
          refio.current.emit("admin", "");
        }, 2000);
        console.log(refio);
        await fetchDeleteData("/api/user/" + data?.ACCOUNTCODE).then((res) => {
          console.log(refio);
        });
      },
    },
    {
      name: "Reset password",
      onClick: function (e, data) {
        console.log(data);
        setUserSend(data);
        setNewPass("");

        setOpen(true);
      },
    },
  ];
  let dataFilter =
    valueSearch === ""
      ? listUser
      : listUser.filter((item) => {
          return item[search].search(valueSearch) != -1;
        });
  dataFilter = dataFilter.filter((item) => {
    switch (sortByPrice) {
      case "Online":
        return item?.ISONLINE === 1;
        break;
      case "Offline":
        return item?.ISONLINE === 0 || !item?.ISONLINE;
        break;
      default:
        return true;
        break;
    }
  });
  const keys = listUser.length === 0 ? [] : Object.keys(listUser[0]);
  return (
    <div>
      <TopTab
        name="manageuse"
        optionSearch={keys}
        type="text"
        placeholder="Tìm kiếm...."
        valueSearch={valueSearch}
        search={search}
        sortOption={sortOption}
        handleOnChangeInput={handleOnChangeInput}
        handleOnChangeSearch={handleOnChangeSearch}
      />
      <ManageList data={dataFilter} buttons={buttons} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="pppp"
            margin="dense"
            id="10"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit2}>Change</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ManageChat.propTypes = {};

export default ManageChat;
