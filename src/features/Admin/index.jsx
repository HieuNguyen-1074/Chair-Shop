import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import TopAdmin from "./components/TopAdmin";
import TabPanel from "./../../components/TabPanel/index";
import user from "../../assets/images/usermg.png";
import manageUser from "../../assets/images/profile.png";
import chair from "../../assets/images/chair.png";
import receipt from "../../assets/images/invoice.png";
import logomini from "../../assets/images/sdd.png";
import iconChat from "../../assets/images/options-lines.png";
import iconReport from "../../assets/images/report.png";

import ManageAdmin from "./components/ManageAdmin/index";
import Report from "./components/Report";
const ManageUsers = React.lazy(() => import("./components/ManageUsers/index"));
const ManageProduct = React.lazy(() =>
  import("./components/ManageProduct/index")
);
const ManageReceipt = React.lazy(() =>
  import("./components/ManageReceipt/index")
);
const ManageChat = React.lazy(() => import("./components/ManageChat/index"));
const ManageCategory = React.lazy(() =>
  import("./components/ManageCategory/index")
);

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
    // position : 'fixed',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    background: "#ed6c63",
    width: "60px",
    height: "100%",
    position: "fixed",
    top: "0",
    left: "0",

    "& img": {
      marginRight: "auto",
      width: "30px",
      height: "30px",
    },
    "& >div:nth-child(2)": {
      "& > div": {
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        margin: "auto 0",
      },
    },
  },
  tabItem: {
    margin: "1rem 0",
    "&:hover": {
      background: "none",
    },
  },
  panel: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "stretch",
    flexDirection: "column",
    margin: "0 7rem",
    marginRight: "4rem",
  },
}));

function Admin(props) {
  const classes = useStyles();
  const { isBox, setIsBox, setUserSend, userSend } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <img
        src={logomini}
        alt=""
        style={{
          position: "fixed",
          zIndex: "100",
          width: "50px",
          margin: "1rem 0",
          marginLeft: ".3rem",
        }}
      />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {/* <Tab icon={<img src={user} />} className={classes.tabItem} /> */}
        <Tab icon={<img src={iconChat} />} className={classes.tabItem} />
        <Tab icon={<img src={chair} />} className={classes.tabItem} />
        <Tab icon={<img src={receipt} />} className={classes.tabItem} />
        <Tab icon={<img src={manageUser} />} className={classes.tabItem} />
        <Tab icon={<img src={iconReport} />} className={classes.tabItem} />
      </Tabs>

      {/* <TabPanel value={value} index={0} className={classes.panel}>
                <TopAdmin />
                <ManageAdmin />
            </TabPanel> */}
      {/* <TabPanel value={value} index={0} className={classes.panel}></TabPanel> */}
      <TabPanel value={value} index={0} className={classes.panel}>
        <TopAdmin />
        <ManageCategory />

        {/* <ManageUsers /> */}
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.panel}>
        <TopAdmin />
        <ManageProduct />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.panel}>
        <TopAdmin />

        <ManageReceipt />
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.panel}>
        <TopAdmin />

        <ManageChat
          isBox={isBox}
          setIsBox={setIsBox}
          setUserSend={setUserSend}
          userSend={userSend}
        />
      </TabPanel>
      <TabPanel value={value} index={4} className={classes.panel}>
        <TopAdmin />

        <Report />
      </TabPanel>
    </div>
  );
}

Admin.propTypes = {};

export default Admin;
