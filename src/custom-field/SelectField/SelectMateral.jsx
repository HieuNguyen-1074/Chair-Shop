import React from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
    "& > div": {
      padding: "10px  30px !important",
    },
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function SelectMateral(props) {
  const { options, handleChange, value, size, label, defaultVal } = props;

  const classes = useStyles();
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      label={"label"}
      onChange={handleChange}
      defaultValue={defaultVal}
      className={classes.formControl}
      variant="outlined"
      size={size}
      placeholder={"label"}
    >
      {options.map((item, index) => {
        return (
          <MenuItem key={index} className={classes.item} value={item}>
            {item}
          </MenuItem>
        );
      })}
    </Select>
  );
}

SelectMateral.propTypes = {};

export default SelectMateral;
