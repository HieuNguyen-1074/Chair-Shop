const data = {
  TIMEORDER: "Thời gian mua",
  STATUS: "Trạng thái thanh toán ",
  ACCOUNTCODE: "Mã Người dùng",
  RECEIPTCODE: "Mã hóa đơn",
  ADDRESS: "Địa Chỉ",
  PHONE: "Số điện thoại",
  PAYDATE: "Ngày thanh toán",
  CANCELRESSON: "Lý do hoàn trả",
  VNPAYTRANS: "Mã VNPAY",
  VNPAYDATE: "Ngày thanh toán VNPAY",
  NAMELOGIN: "Tên đăng nhập",
  PASSWORD: "Mật khẩu",
  PERMISSION: "Quyền",
  EMAIL: "Email",
  ISONLINE: "Trạng thái",
  TIMERECEIVED: "Ngày nhận",
  SHIPPING: "Trạng thái giao hàng",
  DISCOUNT: "Giảm giá",
  TOTALPRICE: "Tổng tiền",
};

export const transForm = (key) => {
  return data?.[key] ? data?.[key] : key;
};
