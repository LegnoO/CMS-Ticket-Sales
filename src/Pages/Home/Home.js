/** @format */

import ChartDataLabels from "chartjs-plugin-datalabels";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const cx = classNames.bind(styles);
ChartJS.register(
  Filler,
  Legend,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  ChartDataLabels
);

const Home = () => {
  const LineData = {
    labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
    datasets: [
      {
        data: [140, 180, 165, 220, 195, 230, 180],
        label: " Doanh thu",
        fill: true,
        borderColor: "rgba(255,153,60,1)",
        borderWidth: 4,
        pointRadius: 0,
        lineTension: 0.4,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx } = chart;
          const gradient = ctx.createLinearGradient(0, 120, 0, 350);
          gradient.addColorStop(0, "rgba(255, 153, 60, 0.2)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          return gradient;
        },
      },
    ],
  };

  const DoughnutData = {
    labels: ["Vé chưa sử dụng", "Vé đã sử dụng"],
    datasets: [
      {
        data: [13568, 56024],
        label: " Gói gia đình",
        borderColor: ["#FF8A48", "#4F75FF"],
        backgroundColor: ["#FF8A48", "#4F75FF"],
      },
    ],
  };

  const LineOptions = {
    plugins: {
      legend: {
        align: "start",
        position: "top",
        display: false,
        labels: {
          boxWidth: 0,
        },
        title: {
          display: false,
        },
      },
      datalabels: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: false,
      },
    },
    layout: {
      padding: 0,
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 140,
        max: 260,
        grid: {
          borderColor: "green",
          borderWidth: 0,
          drawBorder: false,
          drawOnChartArea: true,
          display: true,
          drawTicks: false,
        },
        beginAtZero: false,
        ticks: {
          display: true,
          padding: 5,

          callback: function (value) {
            return value + "tr";
          },
        },
      },
    },
    elements: {},
  };

  const DoughnutOptions = {
    plugins: {
      datalabels: {
        padding: 5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ccc",
        anchor: "end",
        display: true,
        color: "#000",
        backgroundColor: "#fff",
        formatter: function (value) {
          return Math.round(value);
        },
        boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        enabled: true,
      },
      hover: {
        mode: "nearest",
        intersect: false,
      },
      legend: {
        position: "right",
        labels: {
          fontColor: "white",
          boxWidth: 20,
          padding: 100,
        },
        display: false,
      },
    },
    title: {
      display: true,
      text: "Doughnut Chart",
      color: "blue",
    },
  };
  return (
    <div className={cx("wrapper")}>
      <h2>Thống kê</h2>
      <div className="d-flex justify-content-space-between align-items-center ">
        <h4 className="m-0">Doanh thu</h4>
        <DatePicker
          views={["month", "year"]}
          defaultValue={dayjs("04-01-2023")}
          disabled
          sx={{
            "&.MuiFormControl-root": {
              width: "135px",
            },
            "&.MuiFormControl-root .MuiSvgIcon-root": {
              color: "#FF993C",
            },
            "&.MuiFormControl-root .MuiInputBase-input": {
              padding: "10.5px 8px",
            },
          }}
        />
      </div>
      <div>
        <Line
          width={"100%"}
          height={"300"}
          data={LineData}
          options={LineOptions}
        />
      </div>
      <div className={cx("revenue")}>
        <p className={cx("title")}>Tổng doanh thu theo tuần</p>
        <p className={cx("total_price")}>
          525.145.000 <span>đồng</span>
        </p>
      </div>
      <div
        style={{ display: "flex", gap: "10%", justifyContent: "space-around" }}>
        <div>
          <DatePicker
            views={["month", "year"]}
            defaultValue={dayjs("04-01-2023")}
            disabled
            sx={{
              "&.MuiFormControl-root": {
                width: "135px",
              },
              "&.MuiFormControl-root .MuiSvgIcon-root": {
                color: "#FF993C",
              },
              "&.MuiFormControl-root .MuiInputBase-input": {
                padding: "10.5px 8px",
              },
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "15%",
            flex: "1",
            justifyContent: "space-around",
          }}>
          <div
            style={{
              width: "200px",
              height: "220px",
            }}>
            <h4 style={{ textAlign: "center", marginBottom: " 20px" }}>
              Gói Gia đình
            </h4>
            <Doughnut data={DoughnutData} options={DoughnutOptions} />
          </div>
          <div
            style={{
              width: "200px",
              height: "220px",
            }}>
            <h4 style={{ textAlign: "center", marginBottom: " 20px" }}>
              Gói sự kiện
            </h4>
            <Doughnut data={DoughnutData} options={DoughnutOptions} />
          </div>
        </div>
        <div>
          <div className="d-flex" style={{ gap: "5px", marginBottom: "15px" }}>
            <div
              style={{
                height: "20px",
                width: "44px",
                background: "#4F75FF",
                borderRadius: " 4px",
              }}></div>
            <span>Vé đã sử dụng</span>
          </div>
          <div className="d-flex" style={{ gap: "5px" }}>
            <div
              style={{
                height: "20px",
                width: "44px",
                background: "#FF8A48",
                borderRadius: " 4px",
              }}></div>
            <span>Vé chưa sử dụng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
