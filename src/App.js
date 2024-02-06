import React, { useState, useEffect, useCallback } from "react";

import ManageUser from "./features/ManageUser";
import Admin from "./features/Admin/index";
import { fetchGetData, fetchPostData } from "./commons/fetchData";
import { getProduct } from "./redux/SliceProduct";
import { setUser } from "./redux/SliceUser";
import { getReceipt } from "./redux/SliceReceipt";
import Receipt from "./components/Receipt";
import NotFound from "./components/NotFound/index";
import { useCookies } from "react-cookie";
import readCookie from "./commons/readCookie";
import PrivateRoute from "./components/PrivateRouter/index";
import Massage from "./components/Massage";
import { addAlert } from "./redux/SlideAlert";
import BoxChat from "./components/BoxChat";
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite-no-reset.min.css";

import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import Home from "./features/Home/index";
import { setCateGoryList } from "./redux/SliceCategory";
import List from "./features/List";
import ReceiptDetail from "./features/ReceiptDetail";
import Pay from "./features/Pay";
import PayProcess from "./features/PayProcess";
import { io } from "socket.io-client";
const Product = React.lazy(() => import("./features/Product/index"));
function App() {
  //++++++++++++++++++ HOOK ++++++++++++++++++++++++
  const [userSend, setUerSend] = useState("");
  const [permission, setPermission] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isBox, setIsBox] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["dataUser"]);
  const dispatch = useDispatch();

  // const product = useSelector(state => state.product)
  // console.log(product)
  // cookies.dataUser ? (

  // )
  // cookies.dataUser &&
  //   fetchGetData(
  //     `/api/user/${readCookie(cookies.dataUser)?.NAMELOGIN}/${
  //       readCookie(cookies.dataUser).PASSWORD
  //     }`
  //   ).then((re) => {
  //     const data = re;

  //     // console.log("ddddddddddddddddddddddddddddddddddddddddddddd", data);
  //     if (data.error.length === 0) {
  //       handleLogin("userName", data.data.PERMISSION, data);
  //     } else {
  //       alert("error");
  //     }
  //   });
  const user = useSelector((state) => state.user.data);
  const history = useHistory();
  const userData = readCookie(cookies.dataUser)
    ? readCookie(cookies.dataUser)
    : JSON.parse(localStorage.getItem("dataUser"));
  const handleLogin = (userName, permission, data) => {
    setIsLogin(true);
    const action = setUser(data.data);

    setPermission(data.PERMISSION);
    setCookie("dataUser", readCookie(data.cookie), { path: "/" });
    localStorage.setItem("dataUser", JSON.stringify(readCookie(data.cookie)));
    const userData = readCookie(cookies.dataUser)
      ? readCookie(cookies.dataUser)
      : JSON.parse(localStorage.getItem("dataUser"));
    dispatch(action);
    let socket = io("http://localhost:3000/", {
      path: "/api/socket/",
      query: {
        ACCOUNTCODE: userData?.ACCOUNTCODE,
      },
    });
    // const dataCokie = new String(data.cookie)
    dispatch(
      addAlert({
        type: "success",
        massage: "login success",
      })
    );
    if (data?.data?.PERMISSION === "ADMIN") {
      if (
        window.location.pathname === "/admin" ||
        window.location.pathname.indexOf("/receipt/detail/") !== -1 ||
        window.location.pathname === "/product"
      ) {
        return;
      } else {
      }

      window.open("/admin", "_self");
    }
  };
  useEffect(() => {
    readCookie(cookies.dataUser) && setIsLogin(true);
    cookies.dataUser &&
      fetchGetData(
        `/api/user/${readCookie(cookies.dataUser)?.NAMELOGIN}/${
          readCookie(cookies.dataUser).PASSWORD
        }`
      ).then((re) => {
        const data = re;

        // console.log("ddddddddddddddddddddddddddddddddddddddddddddd", data);
        if (data.error.length === 0) {
          handleLogin("userName", data.data.PERMISSION, data);
        } else {
          alert("error");
        }
      });
  }, []);
  const dataUser = useSelector((state) => state.user.data);

  if (cookies.dataUser && isLogin === false) {
    dispatch(setUser(readCookie(cookies.dataUser)));
    if (isLogin === true) {
      setIsLogin(true);
    }
    if (!(permission === "USER" || permission === "ADMIN")) {
      setPermission(readCookie(cookies.dataUser).PERMISSION);
    }
  }

  fetchGetData("/api/category").then((result) => {
    const action = setCateGoryList(result);
    dispatch(action);
  });
  fetchGetData("/api/product").then((result) => {
    const action = getProduct(result);
    dispatch(action);
  });
  useEffect(() => {
    if (cookies.dataUser && isLogin === false) {
      console.log(cookies),
        dispatch(setUser(readCookie(cookies.dataUser))),
        isLogin === true ? "" : setIsLogin(true),
        permission === "USER" || permission === "ADMIN"
          ? ""
          : setPermission(readCookie(cookies.dataUser).PERMISSION);
    }
    cookies.dataUser &&
      isLogin === false &&
      (console.log(cookies),
      dispatch(setUser(readCookie(cookies.dataUser))),
      isLogin === true ? "" : setIsLogin(true),
      permission === "USER" || permission === "ADMIN"
        ? ""
        : setPermission(readCookie(cookies.dataUser).PERMISSION));

    isLogin
      ? permission === "ADMIN"
        ? fetchGetData("/api/user").then((result) => {
            const data = result.filter((element) => {
              return element.PERMISSION != "ADMIN";
            });
            const action = setUser(data);
            dispatch(action);
          })
        : ""
      : "";
    // permission === 'ADMIN' ?

    // : '';
    permission === "ADMIN"
      ? fetchGetData(`/api/receipt`).then((result) => {
          dispatch(getReceipt(result));
        })
      : permission === "USER"
      ? fetchGetData(`/api/receipt/${dataUser.ACCOUNTCODE}`).then((result) => {
          dispatch(getReceipt(result));
        })
      : "";

    return () => {
      // fetchGetData('/api/product').then((result) => {
      //   const action = getProduct(result);
      //   dispatch(action)
      // });
    };
  }, []);
  // readCookie(cookies.dataUser) && setIsLogin(true);
  fetchGetData(`/api/receipt`).then((result) => {
    dispatch(getReceipt(result));
  });
  // readCookie(cookies.dataUser) &&
  //   handleLogin(
  //     readCookie(cookies.dataUser).NAMELOGIN,
  //     readCookie(cookies.dataUser).PERMISSION,
  //     readCookie(cookies.dataUser)
  //   );

  return (
    <div className="App">
      <Router>
        {userData && (
          <BoxChat
            permission={permission}
            isLogin={isLogin}
            isBox={isBox}
            setIsBox={setIsBox}
            userSend={userSend}
            setUerSend={setUerSend}
          />
        )}

        <Switch>
          <Route exact path="/product">
            <Product
              userName={dataUser.NAMELOGIN}
              handleLogin={handleLogin}
              setCookie={setCookie}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              removeCookie={removeCookie}
            />
          </Route>
          <Route exact path="/list">
            <List
              userName={dataUser.NAMELOGIN}
              handleLogin={handleLogin}
              setCookie={setCookie}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              removeCookie={removeCookie}
            />
          </Route>
          <Route exact path="/pay-process">
            {" "}
            <PayProcess
              userName={dataUser.NAMELOGIN}
              handleLogin={handleLogin}
              setCookie={setCookie}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              removeCookie={removeCookie}
            />
          </Route>

          <Route exact path="/admin">
            <Admin
              isBox={isBox}
              setIsBox={setIsBox}
              userSend={userSend}
              setUserSend={setUerSend}
            />
          </Route>
          <Route exact path="/receipt/detail/:receiptCode">
            <ReceiptDetail />
          </Route>
          <Route exact path="/user">
            <PrivateRoute
              authenticated={true}
              path="/user"
              component={ManageUser}
              props={{
                dataUser: user,
                isLogin,
              }}
            >
              <ManageUser />
            </PrivateRoute>
          </Route>
          <Route exact path="/pay">
            <PrivateRoute
              authenticated={true}
              path="/pay"
              component={Pay}
              props={{
                dataUser: user,
                isLogin,
              }}
            >
              <ManageUser />
            </PrivateRoute>
          </Route>
          <Route exact path="/">
            <Home
              userName={dataUser.NAMELOGIN}
              handleLogin={handleLogin}
              setCookie={setCookie}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              removeCookie={removeCookie}
            />
          </Route>

          <Route component={NotFound} />
        </Switch>
        {/* {permission === 'ADMIN' ? <Redirect to="/admin" from='/' /> : <Redirect to="/" from='/user' />} */}
        {/* 
        {isLogin ? '' : <Redirect from='/user' to='/' />} */}
        <Massage />
      </Router>
    </div>
  );
}

export default App;
