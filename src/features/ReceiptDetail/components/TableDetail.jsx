import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { Table } from "react-bootstrap";

export default function TableDetail(props) {
  const { receiptDetail } = props;
  return (
    <>
      <TableContainer component={Paper} aria-label="simple table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ảnh</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Số lượng sản phẩm</TableCell>
              <TableCell>Giá tiền</TableCell>
              <TableCell>Tổng tiền </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receiptDetail?.map((detail) => {
              const detailProduct = detail?.productInfor;
              return (
                <TableRow>
                  <TableCell height={100}>
                    <img
                      className="detail-img"
                      alt="Remy Sharp"
                      src={
                        "data:image/gif;base64," + detailProduct?.IMGARR[0].src
                      }
                    />
                  </TableCell>
                  <TableCell height={100}>
                    <p>{detailProduct?.PRODUCTNAME}</p>
                  </TableCell>
                  <TableCell height={100}>
                    <p>{detailProduct?.PRODUCTCODE}</p>
                  </TableCell>
                  <TableCell height={100}>
                    <p>{detail?.QUANTITY}</p>
                  </TableCell>

                  <TableCell height={100}>
                    <p>{detailProduct?.PRICE}</p>
                  </TableCell>
                  <TableCell height={100}>
                    <p>{detail?.QUANTITY * detailProduct?.PRICE}</p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
