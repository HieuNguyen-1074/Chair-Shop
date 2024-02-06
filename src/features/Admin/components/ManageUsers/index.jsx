import React, { useState } from "react";
import PropTypes from "prop-types";
import TopTab from "../../../../components/TopTab";
import ManageList from "./../../../../components/ManageList/index";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../../../redux/SliceUser";
import { fetchDeleteData } from "../../../../commons/fetchData";

function ManageUsers(props) {
  const user = useSelector((state) => state.user.data);
  const dataNew = [];
  const dispatch = useDispatch();
  user.forEach((element) => {
    const dataElement = {
      NAMELOGIN: element.NAMELOGIN,
      PASSWORD: element.PASSWORD,
      ACCOUNTCODE: element.ACCOUNTCODE,
      EMAIL: element.EMAIL === null ? "IMPORT YET" : element.EMAIL,
      PHONE: element.PHONE === null ? "IMPORT YET" : element.PHONE,
      ADDRESS: element.ADDRESS === null ? "IMPORT YET" : element.ADDRESS,
    };
    dataNew.push(dataElement);
  });
  console.log(dataNew);
  const sortOption = [];
  const keys = dataNew.length === 0 ? [] : Object.keys(dataNew[0]);
  const [valueSearch, setValueSearch] = useState();
  const [search, setSearch] = useState(keys[0]);
  const handleOnChangeInput = (e) => {
    setValueSearch(e.target.value);
  };
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const buttons = [
    {
      name: "remove",
      onClick: function (e, data) {
        console.log(data);
        dispatch(removeUser(data.ACCOUNTCODE));
        fetchDeleteData(`/api/user/${data.ACCOUNTCODE}`);
      },
    },
  ];
  const dataFilter =
    valueSearch === ""
      ? dataNew
      : dataNew.filter((element) => {
          return element[search].search(valueSearch) != -1;
        });
  return (
    <div>
      <TopTab
        name="manageuse"
        optionSearch={keys}
        type="text"
        placeholder="Tìm kiếm...."
        valueSearch={valueSearch}
        search={search}
        sortOption={sortOption}
        handleOnChangeInput={handleOnChangeInput}
        handleOnChangeSearch={handleOnChangeSearch}
      />
      <ManageList data={dataFilter} buttons={buttons} />
    </div>
  );
}

ManageUsers.propTypes = {};

export default ManageUsers;
