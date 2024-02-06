import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { BiUserCircle } from "react-icons/bi";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { fetchPostData } from "../../commons/fetchData";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#ffff",
    padding: "2rem",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    textTransform: "none",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Sign(props) {
  const classes = useStyles();
  const { changePosition, formPosition, setIsOpen, onChange } = props;
  const [nameLogin, setNameLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleClose = (e) => {
    setIsOpen(false);
    changePosition("login", e);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, phone, nameLogin);
    fetchPostData("/api/user", { nameLogin, email, password, phone }).then(
      (result) => {}
    );
    changePosition("login", e);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        position: "absolute",

        zIndex: formPosition === "sign" ? "1" : "-1",
        opacity: formPosition === "sign" ? "1" : "0",
        transition: " all .4s ease-in-out",
      }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BiUserCircle />
        </Avatar>
        <Typography component="h1" variant="h5" color="textSecondary">
          Đăng kí
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="gmail"
                label="Gmail"
                autoFocus
                type="email"
                value={email}
                onChange={(e) => onChange(setEmail, e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Số điện thoại"
                name="lastName"
                autoComplete="lname"
                value={phone}
                onChange={(e) => onChange(setPhone, e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Tên đăng nhập"
                name="email"
                autoComplete="email"
                value={nameLogin}
                onChange={(e) => onChange(setNameLogin, e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => onChange(setPassword, e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={(e) => changePosition("login", e)}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
