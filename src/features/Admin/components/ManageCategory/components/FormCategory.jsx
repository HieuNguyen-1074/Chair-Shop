import {
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Resizer from "react-image-file-resizer";
import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { resizeFile } from "../../../../../commons/readFile";
import { fetchPostData, fetchPutData } from "../../../../../commons/fetchData";

export default function FormCategory(props) {
  const {
    open,
    setOpen,
    changeData,
    setChange,
    categorySelected,
    setCategorySelected,
  } = props;
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const inputUpload = useRef("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    if (Object.keys(categorySelected).length !== 0) {
      setImage(categorySelected?.IMG?.src);
      setName(categorySelected?.CATEGORYNAME);
    } else {
      setImage("");
      setName("");
    }
  }, [categorySelected]);

  const handleSave = async () => {
    if (Object.keys(categorySelected).length === 0) {
      await fetchPostData("/api/category", {
        name: name,
        image: image,
      }).then(() => setChange(!changeData), setOpen(false));
    } else {
      await fetchPutData("/api/category", {
        name: name,
        image: image,
        categoryCode: categorySelected?.CATEGORYCODE,
      }).then(() => setChange(!changeData), setOpen(false));
    }
  };
  const handleFile = async (e) => {
    try {
      const file = e.target.files[0];
      const widthSet = 200;
      const image = await resizeFile(file, Resizer, widthSet);
      const stringBase64 = image.slice(
        image.lastIndexOf("base64") + 7,
        image.length
      );

      setImage(stringBase64);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Dialog className="form-category" open={open} onClose={handleClose}>
        <DialogTitle>Form category</DialogTitle>
        <DialogContent>
          <Card sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              style={{ maxHeight: "200px", objectFit: "contain" }}
              className="image-category"
              image={"data:image/png;base64," + image}
              alt=""
            />
          </Card>
          <Button
            variant="contained"
            onClick={() => inputUpload.current.click()}
            component="label"
          >
            Tải lên
            <input
              style={{ display: "none" }}
              ref={inputUpload}
              accept="image/*"
              multiple
              onChange={handleFile}
              type="file"
            />
          </Button>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên danh mục"
            type="text"
            value={name}
            onChange={handleChangeName}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={handleClose}>
            Hủy
          </Button>
          <Button color="primary" variant="contained" onClick={handleSave}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
