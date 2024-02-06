import React from "react";

import "./style.scss";
import { Button } from "@material-ui/core";
import { fetchPostData, fetchPutData } from "../../../commons/fetchData";
import { useHistory } from "react-router-dom";
export default function Refund(props) {
  const { receipt, setStatus } = props;
  const history = useHistory();
  const handleCancelRefund = async () => {
    await fetchPutData("/api/receipt/change-status", {
      receiptCode: receipt?.RECEIPTCODE,
      status: "Payed",
    }).then(() => {
      setStatus("Payed");
    });
  };
  const handleAccept = () => {
    fetchPostData("/api/vnpay/refund-pay", {
      receiptCode: receipt?.RECEIPTCODE,
    }).then((res) => {
      setStatus("Accept return");
    });
  };
  return (
    <div className="receipt__detail--refund">
      <p>Lý do hủy:</p>
      <p>{receipt?.CANCELRESSON}</p>
      <Button
        variant="outlined"
        onClick={handleCancelRefund}
        color="primary"
        className="pr-10"
      >
        Hủy
      </Button>
      &nbsp; &nbsp;
      <Button variant="contained" onClick={handleAccept} color="primary">
        Chấp nhận
      </Button>
    </div>
  );
}
