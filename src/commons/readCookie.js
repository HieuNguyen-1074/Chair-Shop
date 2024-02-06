const readCookie = (cookie) => {
  console.log(cookie);
  let arrData;
  let data = {};
  typeof cookie === "string"
    ? ((arrData = cookie.split("+")),
      arrData.forEach((element) => {
        const arrElement = element.split("=");
        console.log(arrElement[0]);
        data[arrElement[0]] = arrElement[1];
      }))
    : (data = cookie);
  return data;
};

export default readCookie;
