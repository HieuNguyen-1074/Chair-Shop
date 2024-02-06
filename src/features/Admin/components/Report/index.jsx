import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TopTab from "../../../../components/TopTab";
import ManageList from "./../../../../components/ManageList/index";
import { useSelector, useDispatch } from "react-redux";
import {
  confirmReceipt,
  receivedReceipt,
  removeReceipt,
} from "../../../../redux/SliceReceipt";
import Receipt from "../../../../components/Receipt";
import { fetchDeleteData, fetchPutData } from "./../../../../commons/fetchData";
import { useHistory } from "react-router-dom";
import * as dayjs from "dayjs";
import "./style.scss";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { DateRangePicker } from "rsuite";
import { Line } from "react-chartjs-2";
import { Button } from "@material-ui/core";
import iconSw from "../../../../assets/images/switch-icon.png";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const labels = [
  "2023-05-11",
  "2023-05-12",
  "2023-05-13",
  "2023-05-14",
  "2023-05-15",
];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
export const data = {
  labels,
  datasets: [
    {
      label: "Đã trả",
      id: "Payed",
      data: labels.map(() => Math.random() * (112 - 0) + 0),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Chưa trả",
      id: "Not pay",
      data: labels.map(() => Math.random() * (112 - 0) + 0),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Hoàn trả",
      id: "Return",
      data: labels.map(() => Math.random() * (112 - 0) + 0),
      borderColor: "rgb(53, 12, 235)",
      backgroundColor: "rgba(53, 12, 235, 0.5)",
    },
    {
      label: "Chấp nhận hoàn trả",
      id: "Accept return",
      data: labels.map(() => Math.random() * (112 - 0) + 0),
      borderColor: "rgb(53, 162, 25)",
      backgroundColor: "rgba(53, 12, 25, 0.5)",
    },
    {
      label: "Hủy",
      id: "Cancel",
      data: labels.map(() => Math.random() * (112 - 0) + 0),
      borderColor: "rgb(53, 1, 5)",
      backgroundColor: "rgba(53, 162, 25, 0.5)",
    },
  ],
};
function Report(props) {
  const receipt = useSelector((state) => state.receipt.data);

  const [sortStatus, setSortStatus] = useState("");
  const [sortByDate, setSortByDate] = useState("");
  const [sortByQuatities, setSortByQuatities] = useState("");

  const dispatch = useDispatch();

  const handleOnChangeInput = (e) => {
    setValueSearch(e.target.value);
  };
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const sortOption = [
    {
      title: "trạng thái trả tiền",
      value: sortStatus,
      options: ["All", "Not pay", "Return", "Accept return", "Cancel"],
      handleOnChange: (e) => {
        setSortStatus(e.target.value);
      },
    },
    {
      title: "Giao hàng",
      value: sortByDate,
      options: ["All", "Perpare", "In way", "Done", "Cancel"],
      handleOnChange: (e) => {
        setSortByDate(e.target.value);
      },
    },
  ];

  const optionSearch = [
    "TIMEORDER",
    "STATUS",
    "ACCOUNTCODE",
    "RECEIPTCODE",
    "ADDRESS",
    "PHONE",
    "PAYDATE",
    "CANCELRESSON",
    "VNPAYTRANS",
    "VNPAYDATE",
  ];
  const [search, setSearch] = useState(optionSearch[0]);
  const [valueSearch, setValueSearch] = useState("");
  const [isReceipt, setIsReceipt] = useState(false);
  const history = useHistory();
  const [receiptCode, setReceiptCode] = useState("");
  const [listTime, setListTime] = useState([new Date(), new Date()]);
  const [label, setlable] = useState(getDates(listTime[0], listTime[1]));

  function getDates(startDate, endDate) {
    const dates = [];

    let currentDate = startDate;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }
  const op = {
    "Đã trả": "Payed",
    "Chưa trả": "Not pay",
    "Hoàn trả": "Return",
    "Chấp nhận hoàn trả": "Accept return",
    Hủy: "Cancel",
  };
  useEffect(() => {}, [listTime]);
  const [dataChart, setDataChart] = useState({
    labels: ["Đã trả", "Chưa trả", "Hoàn trả", "Chấp nhận hoàn trả", "Hủy"],
    datasets: [
      {
        label: "# of Votes",
        data: [30, 4, 3, 2, 1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const onChangeRangeDate = (data) => {
    setListTime(data);
  };
  let start = listTime[0];
  let listTimeAll = [];
  while (dayjs(start).isBefore(dayjs(listTime[1]).add(1, "day"))) {
    listTimeAll.push(dayjs(start).format("YYYY-MM-DD"));
    start = dayjs(start).add(1, "day");
  }
  const [mode, setMode] = useState("Báo cáo theo doanh thu");

  return (
    <div>
      <div className="report">
        <div className="report-main">
          <div className="report-main-header">
            <DateRangePicker
              block
              value={listTime}
              onChange={onChangeRangeDate}
            />
            <Button
              color="primary"
              onClick={() =>
                mode === "Báo cáo theo doanh thu"
                  ? setMode("Báo cáo theo số lượng")
                  : setMode("Báo cáo theo doanh thu")
              }
              variant="contained"
            >
              {mode}
              <img class="icon-switch" src={iconSw} alt="icon switch" />
            </Button>
          </div>

          <div className="report-chart">
            <div>
              {" "}
              <Pie
                data={{
                  ...dataChart,
                  datasets: dataChart.datasets.map((dataset) => {
                    return {
                      ...dataset,
                      data: dataChart.labels.reduce((count, time) => {
                        let length = receipt.filter((item) => {
                          return (
                            item.STATUS === op[time] &&
                            dayjs(listTime[0]).isBefore(
                              dayjs(item.TIMEORDER)
                            ) &&
                            dayjs(listTime[1]).isAfter(item.TIMEORDER)
                          );
                        });
                        mode === "Báo cáo theo doanh thu"
                          ? count.push(
                              length.reduce(
                                (count, item) => (count += item?.TOTALPRICE),
                                0
                              )
                            )
                          : count.push(length.length);

                        return count;
                      }, []),
                    };
                  }),
                }}
              />
            </div>
            <Line
              options={options}
              data={{
                ...data,
                labels: listTimeAll,
                datasets: data?.datasets.map((dataset) => {
                  return {
                    ...dataset,
                    data: listTimeAll.reduce((count, time) => {
                      let length = receipt.filter((item) => {
                        return (
                          dayjs(time).format("YYYY-MM-DD") ===
                            dayjs(item.TIMEORDER).format("YYYY-MM-DD") &&
                          item.STATUS === dataset.id
                        );
                      });
                      mode === "Báo cáo theo doanh thu"
                        ? count.push(
                            length.reduce(
                              (count, item) => (count += item?.TOTALPRICE),
                              0
                            )
                          )
                        : count.push(length.length);

                      return count;
                    }, []),
                  };
                }),
              }}
            />
          </div>
          <ManageList
            name="await"
            data={receipt
              .filter(
                (item) =>
                  dayjs(listTime[0]).isBefore(dayjs(item.TIMEORDER)) &&
                  dayjs(listTime[1]).isAfter(item.TIMEORDER)
              )
              .map((item) => {
                return {
                  RECEIPTCODE: item?.RECEIPTCODE,
                  STATUS: item?.STATUS,
                  SHIPPING: item?.SHIPPING,
                  ACCOUNTCODE: item?.ACCOUNTCODE,
                  TOTALPRICE: item?.TOTALPRICE,
                  PAYDATE: item?.PAYDATE,
                };
              })}
            buttons={[]}
          />
        </div>
      </div>
      {/* <Receipt
                isReceipt={isReceipt}
                setIsReceipt={setIsReceipt}
                receiptCode={receiptCode}
                setReceiptCode={setReceiptCode}
            /> */}
    </div>
  );
}

Report.propTypes = {};

export default Report;
