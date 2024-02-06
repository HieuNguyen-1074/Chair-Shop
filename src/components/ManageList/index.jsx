import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Fragment } from "react";
import { transForm } from "../../commons/tranSa";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const useStyles = makeStyles({
  table: {
    // minWidth: 700,
  },
  root: {
    marginTop: "1rem",
  },
  title: {
    "& > *": {
      background: "#ed6c63 !important",
      color: "#fff",
    },
  },
  button: {
    marginLeft: ".2rem",
  },
  buttonList: {
    display: "flex",
  },
});
const StyledTableRow = withStyles((theme) => ({}))(TableRow);
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
function ManageList(props) {
  const classes = useStyles();
  const { data, name, buttons } = props;
  const title = data.length === 0 ? [] : Object.keys(data[0]);
  const newData = data.map((item, index) => {
    const newItem = {};

    for (const key of title) {
      item[key] === null && (newItem[key] = item[key]);
      // item[key] === null ? '' : (
      //     typeof item[key].getMonth === 'function' ? newItem[key] = `${item[key].getDay()}/${item[key].getMonth()}/${item[key].getFullYear()}` : newItem[key] = item[key]
      //)
    }
    return newItem;
  });
  const keys = data.length === 0 ? [] : Object.keys(data[0]);
  keys.pop();
  return data.length === 0 ? (
    <p
      style={{
        textAlign: "center",
        textTransform: "uppercase",
        marginTop: "2rem",
      }}
    >
      Không có dữ liệu
    </p>
  ) : (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <StyledTableRow className={classes.title}>
            {keys.map((item, index) => {
              return index === 0 ? (
                <StyledTableCell>{transForm(item)}</StyledTableCell>
              ) : (
                <StyledTableCell align="center">
                  {transForm(item)}
                </StyledTableCell>
              );
            })}
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            return (
              <StyledTableRow>
                {keys.map((value, index) => {
                  return index === 0 ? (
                    <StyledTableCell>{item[value]}</StyledTableCell>
                  ) : (
                    <StyledTableCell align="center">
                      {item[value]}
                    </StyledTableCell>
                  );
                })}
                <StyledTableCell align="right" className={classes.buttonList}>
                  {buttons.map((button) => {
                    return (
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        onClick={(e) => button.onClick(e, item)}
                      >
                        {button.name}
                      </Button>
                    );
                  })}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ManageList.propTypes = {};

export default ManageList;
