import {
  headerImg,
  logoImg,
  chairImg,
  dercroration,
  productItems,
  offerImg,
  newProductImgLeft,
  blogImgs,
  linkb,
  linkContact,
  imgBt,
} from "../image/";

const { car, cart, clock, call, like, user } = headerImg;

const headerContent = {
  carContent: {
    src: car,
    content: "Miễn phí Vân chuyển",
  },
  clockContent: {
    src: clock,
    content: "Giao hàng nhanh ",
  },
  likeContent: {
    src: like,
    content: "Đổi trả trong vòng 30 ngày",
  },
  cartContent: {
    src: cart,
    content: "cart",
  },
  callContent: {
    src: call,
    content: "Số điện thoại +987 482 984",
  },
  userContent: {
    src: user,
    content: "Đăng nhập",
  },
};

const logoLink = logoImg;

const navbarLink = {
  home: {
    title: "home",
    src: "",
    id: 0,
  },
  page: {
    title: "page",
    src: "",
    id: 1,
  },
  portfolio: {
    title: "portfolio",
    src: "",
    id: 2,
  },
  shop: {
    title: "shop",
    src: "",
    id: 3,
  },
  blog: {
    title: "blog",
    src: "",
    id: 4,
  },
  contact: {
    title: "contact",
    src: "",
    id: 1,
  },
};

const { chair1, chair2, chair3, chair4, chair5, chair6 } = chairImg;
const chairContent = {
  chair1: {
    src: chair1,
    id: 0,
  },
  chair2: {
    src: chair2,
    id: 1,
  },
  chair3: {
    src: chair3,
    id: 2,
  },
  chair4: {
    src: chair4,
    id: 3,
  },
  chair5: {
    src: chair5,
    id: 4,
  },
  chair6: {
    src: chair6,
    id: 5,
  },
};

const { dc1, dc2 } = dercroration;
const dcContent = {
  dc1: {
    src: dc1,
    id: 0,
  },
  dc2: {
    src: dc2,
    id: 1,
  },
};

export {
  headerContent,
  logoLink,
  navbarLink,
  chairContent,
  dcContent,
  productItems,
  offerImg,
  newProductImgLeft,
  blogImgs,
  linkb,
  linkContact,
  imgBt,
};
