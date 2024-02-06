import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Button } from "@material-ui/core";

function Item(props) {
  const { item } = props;
  console.log(item);
  return (
    <div>
      {/* <div className="decroration__item--left">
                <img src={"data:image/gif;base64,"+item.IMG.src} alt="" />
                <p>{item.CATEGORYNAME}</p>
                <Button  color='primary' variant="contained">Go to list</Button>
            </div> */}
    </div>
  );
}

Item.propTypes = {};

export default Item;
