import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { fetchDeleteData, fetchPutData } from "../../commons/fetchData";

export default function PayProcess() {
  const { search } = useLocation();

  //=> '?foo=bar'

  const parsed = queryString.parse(search);
  const {
    vnp_TransactionStatus,
    vnp_ResponseCode,
    vnp_TxnRef,
    vnp_PayDate,
    vnp_TransactionNo,
  } = parsed;
  const history = useHistory();
  if (vnp_TransactionStatus === "00") {
    fetchPutData("/api/receipt/change-pay", {
      receiptCode: vnp_TxnRef,
      isPay: true,
      vnpayCode: vnp_TransactionNo,
      vnpayDate: vnp_PayDate,
    }).then(() => {
      setTimeout(() => {
        window.open("/user", "_self");
      }, 2000);
    });
  } else {
    fetchDeleteData("/api/receipt/" + vnp_TxnRef).then((res) => {
      /* `setTimeout(()=>{history.push('/pay')}, 2000)` is delaying the redirection to the `/pay`
        page by 2 seconds (2000 milliseconds) after an error occurs during the payment process. This
        gives the user some time to read the error message before being redirected to the payment
        page. */
      // setTimeout(()=>{
      //     history.push('/pay')
      // } , 2000)
    });
  }
  return (
    <div>
      {vnp_TransactionStatus && vnp_TransactionStatus === "00"
        ? "Your receipt has been payed. "
        : "Error while pay"}
    </div>
  );
}
