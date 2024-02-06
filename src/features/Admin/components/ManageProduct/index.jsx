import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TopTab from "../../../../components/TopTab";
import ManageList from "./../../../../components/ManageList/index";
import Receipt from "./../../../../components/Receipt/index";
import { useSelector, useDispatch } from "react-redux";
import ItemProduct from "./../../../../components/ItemProduct/index";
import Grid from "@material-ui/core/Grid";
import Update from "./components/Update/index";
import { deleteProduct } from "../../../../redux/SliceProduct";
import { fetchDeleteData, fetchGetData } from "../../../../commons/fetchData";
import { Button } from "@material-ui/core";

function ManageProduct(props) {
  const [isSee, setIsSee] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const sortOptionPrice = ["Tăng dần", "Giảm dần"];
  const [category, setListCategory] = useState([]);
  const [categoryName, setListCategoryName] = useState("");
  useEffect(() => {
    fetchGetData("/api/category").then((result) => {
      setListCategory(result);
    });
  }, []);
  const sortOption = [
    {
      title: "Sắp xếp theo giá",
      value: sortByPrice,
      options: sortOptionPrice,
      handleOnChange: (e) => {
        setSortByPrice(e.target.value);
      },
    },
    {
      title: "Lọc theo danh mục",
      value: categoryName,
      options: ["All", ...category.map((item) => item?.CATEGORYNAME)],
      handleOnChange: (e) => {
        setListCategoryName(e.target.value);
      },
    },
  ];
  const handleSortPrice = (e) => {
    setSortByPrice(e.target.value);
  };
  const product = useSelector((state) => state.product.data);

  const dataNew = product.map((item, index) => {
    return {
      src: `data:image/gif;base64,${
        item.IMGARR.length === 0 ? "" : item.IMGARR[0].src
      }`,
      discount: new String(item.DISCOUNT),
      rate: item.RATE,
      name: item.PRODUCTNAME,
      id: item.PRODUCTCODE,
      price: new String(item.PRICE),
      CATEGORYID: item.CATEGORYID,
      categoryName: category.find((e) => e.CATEGORYCODE === item.CATEGORYID)
        ?.CATEGORYNAME,
    };
  });
  const optionSearch = ["Tên", "Mã", "Giá"];
  const optionSearchId = { Tên: "name", Mã: "id", Giá: "price" };
  const [search, setSearch] = useState(optionSearch[0]);
  const [valueSearch, setValueSearch] = useState("");
  const handleOnChangeInput = (e) => {
    setValueSearch(e.target.value);
  };
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleClick = (id) => {
    setIdUpdate(id);
    setStatus("update");
    setIsSee(true);
  };
  let dataFilter =
    valueSearch === ""
      ? dataNew
      : dataNew.filter((item) => {
          return item[optionSearchId[search]].search(valueSearch) != -1;
        });
  dataFilter =
    categoryName === "All" || categoryName === ""
      ? dataFilter
      : dataFilter.filter((item) => {
          const cate = category?.find(
            (item) => item?.CATEGORYNAME === categoryName
          )?.CATEGORYCODE;
          console.log(cate, categoryName);
          return item?.CATEGORYID === cate;
        });
  let dataSort =
    sortByPrice === ""
      ? dataFilter
      : dataFilter.sort((a, b) => {
          if (sortByPrice === "Tăng dần") {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
  const handleCreate = () => {
    setStatus("create");
    setIsSee(true);
  };
  const handleDelete = (id) => {
    const action = deleteProduct(id);
    dispatch(action);
    fetchDeleteData(`/api/product/${id}`);
  };
  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleCreate}>
        Tạo sản phẩm
      </Button>

      <TopTab
        name="product"
        type="text"
        placeholder="Tìm kiếm....."
        valueSearch={valueSearch}
        search={search}
        handleOnChangeInput={handleOnChangeInput}
        handleOnChangeSearch={handleOnChangeSearch}
        optionSearch={optionSearch}
        // sortOptionPrice={sortOptionPrice}
        // sortByPrice={sortByPrice}
        // handleSortPrice={handleSortPrice}
        sortOption={sortOption}
      />
      {/* <ManageList
                data={data}
                buttons={buttons}
            />
            <Receipt
                isReceipt={isReceipt}
                setIsReceipt={setIsReceipt}
            /> */}
      <Grid container spacing={1}>
        {dataSort.map((item, index) => {
          return (
            <Grid container item xs={2} spacing={1} key={index}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <ItemProduct
                  {...item}
                  handleClick={handleClick}
                  admin={true}
                  handleDelete={handleDelete}
                />
              </div>
            </Grid>
          );
        })}
      </Grid>
      <Update
        isSee={isSee}
        setIsSee={setIsSee}
        idUpdate={idUpdate}
        status={status}
      />
    </div>
  );
}

ManageProduct.propTypes = {};

export default ManageProduct;
