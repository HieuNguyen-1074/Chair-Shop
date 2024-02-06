import React, { useState } from "react";
import PropTypes from "prop-types";
import TopTab from "../../../../components/TopTab";
import ManageList from "./../../../../components/ManageList/index";
import { useSelector, useDispatch } from "react-redux";
import {
  confirmReceipt,
  receivedReceipt,
  removeReceipt,
} from "../../../../redux/SliceReceipt";
import Receipt from "../../../../components/Receipt";
import { fetchDeleteData, fetchPutData } from "./../../../../commons/fetchData";
import { useHistory } from "react-router-dom";
import * as dayjs from "dayjs";
function ManageReceipt(props) {
  const receipt = useSelector((state) => state.receipt.data);

  const [sortStatus, setSortStatus] = useState("");
  const [sortByDate, setSortByDate] = useState("");
  const [sortByQuatities, setSortByQuatities] = useState("");
  const dispatch = useDispatch();

  const handleOnChangeInput = (e) => {
    setValueSearch(e.target.value);
  };
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const sortOption = [
    {
      title: "trạng thái trả tiền",
      value: sortStatus,
      options: ["All", "Not pay", "Return", "Accept return", "Cancel"],
      handleOnChange: (e) => {
        setSortStatus(e.target.value);
      },
    },
    {
      title: "Giao hàng",
      value: sortByDate,
      options: ["All", "Perpare", "In way", "Done", "Cancel"],
      handleOnChange: (e) => {
        setSortByDate(e.target.value);
      },
    },
  ];

  const optionSearch = [
    "TIMEORDER",
    "STATUS",
    "ACCOUNTCODE",
    "RECEIPTCODE",
    "ADDRESS",
    "PHONE",
    "PAYDATE",
    "CANCELRESSON",
    "VNPAYTRANS",
    "VNPAYDATE",
  ];
  const [search, setSearch] = useState(optionSearch[0]);
  const [valueSearch, setValueSearch] = useState("");
  const [isReceipt, setIsReceipt] = useState(false);
  const history = useHistory();
  const [receiptCode, setReceiptCode] = useState("");
  let dataFilter =
    sortStatus === "" || sortStatus === "All"
      ? receipt
      : receipt.filter((element) => {
          return element.STATUS === sortStatus;
        });
  dataFilter =
    sortByDate === "" || sortByDate === "All"
      ? dataFilter
      : dataFilter.filter((element) => {
          return element.SHIPPING === sortByDate;
        });
  const dataFilterSearch =
    valueSearch === ""
      ? dataFilter
      : dataFilter.filter((element) => {
          return element[search].search(valueSearch) != -1;
        });

  const dataSort = dataFilterSearch;
  const buttonAwait = [
    {
      name: "Xem",
      onClick: function (e, data) {
        history.push("/receipt/detail/" + data.RECEIPTCODE);

        setReceiptCode(data.RECEIPTCODE);
        setIsReceipt(true);
      },
    },
  ];
  return (
    <div>
      <TopTab
        name="manageuse"
        optionSearch={optionSearch}
        type="text"
        placeholder="Tìm kiếm...."
        valueSearch={valueSearch}
        sortOption={sortOption}
        search={search}
        handleOnChangeInput={handleOnChangeInput}
        handleOnChangeSearch={handleOnChangeSearch}
      />
      <ManageList
        name="await"
        data={dataSort.map((item) => {
          return {
            ...item,
            TIMEORDER: dayjs(item.TIMEORDER).format("YYYY-MM-DD"),
            PAYDATE: dayjs(item.PAYDATE).format("YYYY-MM-DD"),
          };
        })}
        buttons={buttonAwait}
      />
      {/* <Receipt
                isReceipt={isReceipt}
                setIsReceipt={setIsReceipt}
                receiptCode={receiptCode}
                setReceiptCode={setReceiptCode}
            /> */}
    </div>
  );
}

ManageReceipt.propTypes = {};

export default ManageReceipt;
