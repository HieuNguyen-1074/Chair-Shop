import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ManageUserInfor from "./components/ManageUserInfor";

import ManageComfirmed from "./components/ManageConfirmed";
import ManageReceived from "./components/ManageReceived";
import ManageWait from "./components/ManageWait/index";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TabPanel from "./../../../../components/TabPanel/index";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetData } from "../../../../commons/fetchData";
import { getReceipt } from "../../../../redux/SliceReceipt";
import { useHistory } from "react-router-dom";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: "2rem auto",
    marginTop: "3rem",
    maxWidth: "60rem",
    background: "#ffff",
  },
  main: {
    background: "#ffff",
    color: "#000",
    boxShadow: "none",
  },
  panel: {
    padding: "0 !important",
  },
}));
function ManageUserMain(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { setIsReceipt, setReceiptCode } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const dataUser = useSelector((state) => state.user.data);
  const dataReceipt = useSelector((state) => state.receipt.data);
  const dataProduct = useSelector((state) => state.product.data);

  const dataConfirmed = [];
  const dataReceived = [];
  const dataAwait = [];
  dataReceipt.forEach((element) => {
    switch (element.STATUS) {
      case "CONFIRMED":
        dataConfirmed.push(element);
        break;

      case "RECEIVED":
        dataReceived.push(element);
        break;
      case "AWAIT":
        dataAwait.push(element);
        break;
      default:
        break;
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickReceiptCode = (receiptCode) => {
    history.push("/receipt/detail/" + receiptCode);
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.main} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          variant="fullWidth"
        >
          <Tab className="tab" label="Information" {...a11yProps(0)} />
          <Tab className="tab" label="Receipt" {...a11yProps(1)} />
        </Tabs>
        <TabPanel className={classes.panel} value={value} index={0}>
          <ManageUserInfor />
        </TabPanel>
        <TabPanel className={classes.panel} value={value} index={1}>
          <ManageWait
            data={dataReceipt}
            dataProduct={dataProduct}
            setIsReceipt={setIsReceipt}
            setReceiptCode={setReceiptCode}
            handleClickReceiptCode={handleClickReceiptCode}
          />
        </TabPanel>
      </AppBar>
    </div>
  );
}

ManageUserMain.propTypes = {};

export default ManageUserMain;
