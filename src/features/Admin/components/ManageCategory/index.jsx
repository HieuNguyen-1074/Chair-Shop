import React, { useEffect } from "react";
import FormCategory from "./components/FormCategory";
import { useState } from "react";
import { Card } from "reactstrap";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import "./style.scss";
import { setCateGoryList } from "../../../../redux/SliceCategory";
import { useDispatch } from "react-redux";
import { fetchDeleteData, fetchGetData } from "../../../../commons/fetchData";

export default function ManageCategory() {
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const [category, setListCategory] = useState([]);
  const [changeData, setChange] = useState(false);
  const [categorySelected, setCategorySelected] = useState({});
  useEffect(() => {
    fetchGetData("/api/category").then((result) => {
      const action = setCateGoryList(result);
      dispatch(action);
      setListCategory(result);
    });
  }, [changeData]);
  const handleDelete = (code) => {
    fetchDeleteData("/api/category/" + code).then((result) => {
      setChange(!changeData);
    });
  };
  return (
    <div>
      <Button
        style={{ marginBottom: "20px" }}
        size="large"
        color="primary"
        variant="contained"
        onClick={() => {
          setCategorySelected({});
          setOpenForm(true);
        }}
      >
        Thêm danh mục
      </Button>
      <FormCategory
        setChange={setChange}
        open={openForm}
        changeData={changeData}
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
        setOpen={setOpenForm}
      />
      {
        <div className="list-category">
          {category.map((item) => {
            return (
              <Card key={item?.CATEGORYCODE}>
                <img
                  src={"data:image/png;base64," + item?.IMG?.src}
                  alt=""
                  srcset=""
                />
                <CardMedia
                  image={"data:image/png;base64," + item?.IMG?.src}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.CATEGORYNAME}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleDelete(item?.CATEGORYCODE)}
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    Xóa
                  </Button>
                  <Button
                    onClick={() => {
                      setCategorySelected(item);
                      setOpenForm(true);
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Chỉnh sửa
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </div>
      }
    </div>
  );
}
