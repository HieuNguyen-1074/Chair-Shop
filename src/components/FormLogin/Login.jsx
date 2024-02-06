import React, { useState } from "react";
// import Avatar from "@material-ui/core/Avatar";
import { CssBaseline, Button } from "@material-ui/core";
import { Link } from "@material-ui/core";
// import Grid from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { BiUserCircle } from "react-icons/bi";
import { fetchGetData } from "./../../commons/fetchData";
import { Avatar } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#0000",
    background: "#ffff",
    padding: "2rem",
    borderRadius: "3px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    textTransform: "none", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bottom: {
    justifyContent: "center",
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const {
    formPosition,
    changePosition,
    handleLogin,
    setIsOpen,
    onChange,
    setCookie,
  } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleClose = (e) => {
    e.preventDefault();
    fetchGetData(`/api/user/${userName}/${password}`).then((re) => {
      const data = re;

      // console.log("ddddddddddddddddddddddddddddddddddddddddddddd", data);
      if (data.error.length === 0) {
        handleLogin(userName, data.data.PERMISSION, data);
        if (data.data.PERMISSION === "ADMIN") {
          window.open("/admin", "_self");
        } else {
          window.location.reload();
        }
      } else {
        alert("error");
      }

      setPassword("");
      setUserName("");
    });
    return;
    // setIsOpen(false)
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        zIndex: formPosition === "login" ? "1" : "-1",
        opacity: formPosition === "login" ? "1" : "0",
        transition: " all .4s ease-in-out",
      }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BiUserCircle />
        </Avatar>
        <Typography component="h1" variant="h5" color="textSecondary">
          Đăng nhập
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Tên đăng nhập"
            name="email"
            value={userName}
            onChange={(e) => onChange(setUserName, e)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            value={password}
            onChange={(e) => onChange(setPassword, e)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClose}
          >
            Đăng nhập
          </Button>
          <Grid container className={classes.bottom}>
            <Grid item xs>
              <Link href="#" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={(e) => changePosition("sign", e)}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={8}>
                <Copyright />
            </Box> */}
    </Container>
  );
}
