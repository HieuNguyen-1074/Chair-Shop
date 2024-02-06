import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Resizer from "react-image-file-resizer";
import Slider from "react-slick";
import { FcNext, FcPrevious } from "react-icons/fc";
import { RiImageAddFill } from "react-icons/ri";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { FaTimes } from "react-icons/fa";
import { deleteProductImg } from "../../../../../../../../redux/SliceProduct";
import { readImg, resizeFile } from "../../../../../../../../commons/readFile";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function UpdateLeft(props) {
  const {
    idUpdate,
    newArrImg,
    setNewArrImg,
    dataDelete,
    setDataDelete,
    imgAdd,
    setImgAdd,
    isUpdate,
    isSee,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.data);
  const [arrImgNew, setArrImgNew] = useState([]);
  useEffect(() => {
    const arrImg =
      idUpdate === "" || null || undefined
        ? []
        : product.find((element) => element.PRODUCTCODE === idUpdate)?.IMGARR;
    if (idUpdate) {
      setArrImgNew(arrImg);
    } else {
      setArrImgNew([]);
    }
  }, [isSee]);

  const totalImg = [...arrImgNew, ...imgAdd];
  const handleDeleteImg = (src) => {
    const action = deleteProductImg({ idImg: src.id, idProduct: idUpdate });
    totalImg.length === 1
      ? alert("con 1")
      : setArrImgNew(
          arrImgNew.filter((element) => {
            return element.src != src.src;
          }),
          // dispatch(action),
          // console.log(src, dataDelete),
          setDataDelete([...dataDelete, src.id])
        );
  };
  const handleDeleteImgNew = (e, item) => {
    totalImg.length === 1
      ? alert("con 1")
      : setImgAdd(
          imgAdd.filter((element) => {
            return element != item;
          })
        );
  };
  const handleFile = async (e) => {
    try {
      const file = e.target.files[0];
      const widthSet = 400;
      const image = await resizeFile(file, Resizer, widthSet);
      const stringBase64 = image.slice(
        image.lastIndexOf("base64") + 7,
        image.length
      );

      console.log(image);
      console.log(stringBase64);
      setImgAdd([...imgAdd, stringBase64]);
    } catch (err) {
      console.log(err);
    }
  };

  const settings = {
    dots: true,

    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <FcNext />,
    prevArrow: <FcPrevious />,
  };
  return (
    <div>
      <Slider {...settings}>
        {arrImgNew.map((item, index) => {
          return (
            <div key={index}>
              <FaTimes
                onClick={(e) => handleDeleteImg(item)}
                style={{
                  float: "right",
                }}
              />
              <img
                style={{
                  margin: "0 auto",
                  width: "77%",
                }}
                src={`data:image/gif;base64,${item.src}`}
                alt=""
              />
            </div>
          );
        })}
        {imgAdd.map((item, index) => {
          return (
            <div key={index}>
              <FaTimes
                onClick={(e) => handleDeleteImgNew(e, item)}
                style={{
                  float: "right",
                }}
              />
              <img
                style={{
                  margin: "0 auto",
                }}
                src={`data:image/gif;base64,${item}`}
                alt=""
              />
            </div>
          );
        })}
      </Slider>
      <div className="update-left-form">
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={handleFile}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <RiImageAddFill />
          </IconButton>
        </label>
      </div>
    </div>
  );
}

UpdateLeft.propTypes = {};

export default UpdateLeft;
