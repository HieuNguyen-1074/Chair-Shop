import React, { useState } from "react";
import PropTypes from "prop-types";
import TopTab from "../../../../../../components/TopTab";
import ManageList from "../../../../../../components/ManageList";
import { fetchDeleteData } from "../../../../../../commons/fetchData";
import { removeReceipt } from "../../../../../../redux/SliceReceipt";
import { useDispatch } from "react-redux";
import "./style.css";
function ManageWait(props) {
  const { data, dataProduct, setIsReceipt, handleClickReceiptCode } = props;

  const dispatch = useDispatch();

  const optionSearch = data.length === 0 ? [] : Object.keys(data[0]);
  console.log("ddddddddddsssssss");
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState(optionSearch[0]);
  console.log(data);
  const buttons = [
    {
      name: "view",
      onClick: function (e, data) {
        console.log(data);
        handleClickReceiptCode(data.RECEIPTCODE);
        setIsReceipt(true);
      },
    },
  ];
  const handleOnChangeInput = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  };
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const dataFilter =
    searchValue === ""
      ? data
      : data.filter((element, index) => {
          return new String(element[search]).search(searchValue) === -1
            ? ""
            : element;
        });

  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByDate, setSortByDate] = useState("");
  // const sortOption = [
  //     'INCREASE',
  //     'REDUCE'
  // ];
  const dataSort =
    sortByDate != ""
      ? [...dataFilter].sort((a, b) => {
          if (sortByDate === "INCREASE") {
            return Date.parse(a.TIMEORDER) - Date.parse(b.TIMEORDER);
            // return Date.parse(a.TIMEORDER) - Date.parse(b.TIMEORDER)
          } else {
            return Date.parse(b.TIMEORDER) - Date.parse(a.TIMEORDER);
            // return Date.parse(b.TIMEORDER) - Date.parse(a.TIMEORDER);
          }
        })
      : sortByPrice != ""
      ? [...dataFilter].sort((a, b) => {
          if (sortByPrice === "INCREASE") {
            return a.TOTALPRICE - b.TOTALPRICE;
            // return a.TOTALPRICE - b.TOTALPRICE
          } else {
            return b.TOTALPRICE - a.TOTALPRICE;
            // return b.TOTALPRICE - a.TOTALPRICE;
          }
        })
      : dataFilter;
  const sortOption = [
    {
      title: "Date",
      value: sortByDate,
      options: ["REDUCE", "INCREASE"],
      handleOnChange: (e) => {
        setSortByPrice("");
        setSortByDate(e.target.value);
      },
    },
    {
      title: "Price",
      value: sortByPrice,
      options: ["REDUCE", "INCREASE"],
      handleOnChange: (e) => {
        setSortByDate("");
        setSortByPrice(e.target.value);
      },
    },
  ];
  return (
    <div className="await">
      <TopTab
        name="await"
        optionSearch={optionSearch}
        type="text"
        placeholder={`IMPORT ${search}`}
        value={searchValue}
        handleOnChangeInput={handleOnChangeInput}
        handleOnChangeSearch={handleOnChangeSearch}
        search={search}
        sortOption={sortOption}
      />
      <ManageList name="await" data={dataSort} buttons={buttons} />
    </div>
  );
}

ManageWait.propTypes = {};

export default ManageWait;
