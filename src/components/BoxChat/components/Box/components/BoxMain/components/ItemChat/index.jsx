import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import dayjs from "dayjs";
function ItemChat(props) {
  const { content, align } = props;
  return (
    <div
      style={{
        alignSelf: align === "right" ? "flex-end" : "flex-start",
        marginTop: "10px",
      }}
    >
      <div className="item-chat">
        <p>{content?.CONTENT}</p>
        <p className="send-date">
          {dayjs(content?.DATESENT).format("DD/MM/YYYY HH:MM")}
        </p>
      </div>
    </div>
  );
}

ItemChat.propTypes = {};

export default ItemChat;
