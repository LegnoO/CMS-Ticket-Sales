/** @format */

import { useState, useRef } from "react";

import classNames from "classnames/bind";
import styles from "./TicketFilter.module.scss";
import Button from "../../../../Button";
import DatePicker from "react-datepicker";
import { Checkbox, Radio } from "@mui/material";
import { FaCalendarAlt } from "react-icons/fa";
import DateInput from "../../../../Input/InputDate";
import "react-datepicker/dist/react-datepicker.css";

const cx = classNames.bind(styles);

const TicketFilter = ({ modal, toggleModal, handleFilter }) => {
  const handleToggle = () => {
    toggleModal();
  };
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkInput, setCheckInput] = useState({
    statusData: ["Đã sử dụng", "Chưa sử dụng", "Hết hạn"],
    gateData: ["Cổng 1", "Cổng 2", "Cổng 3", "Cổng 4", "Cổng 5"],
    status: "Tất cả",
    gate: true,
  });

  const inputRef = useRef();

  const dateFilter = {
    startDate: startDate / 1000,
    endDate: endDate / 1000,
  };

  const checkStatusInput = [
    { name: "status_all", label: "Tất cả" },
    { name: "used", label: "Đã sử dụng" },
    { name: "unused", label: "Chưa sử dụng" },
    { name: "expired", label: "Hết hạn" },
  ];

  const checkGateInput = [
    { name: "gate1", label: "Cổng 1" },
    { name: "gate2", label: "Cổng 2" },
    { name: "gate3", label: "Cổng 3" },
    { name: "gate4", label: "Cổng 4" },
    { name: "gate5", label: "Cổng 5" },
  ];

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={cx("wrapper")}>
      <h2>Lọc vé</h2>

      <div className={cx("date")}>
        <div className={cx("date-picker")}>
          <div className={cx("content")}>
            <h4>Từ ngày</h4>
            <div className={cx("start-date")}>
              <DatePicker
                selected={startDate.setHours(0, 0, 0, 0)}
                onChange={(date) => {
                  setStartDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                customInput={
                  <DateInput
                    icon={<FaCalendarAlt style={{ color: "#FF993C" }} />}
                    ref={inputRef}
                  />
                }
              />
            </div>
          </div>
          <div className={cx("content")}>
            <h4>Đến ngày</h4>
            <div className={cx("end-date")}>
              <DatePicker
                classNames="test"
                selected={endDate.setHours(0, 0, 0, 0)}
                onChange={(date) => {
                  console.log(date);
                  setEndDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                customInput={
                  <DateInput
                    icon={<FaCalendarAlt style={{ color: "#FF993C" }} />}
                    ref={inputRef}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className={cx("status")}>
        <h4>Tình trạng sử dụng</h4>

        <div className={cx("checkbox")}>
          {checkStatusInput.map((data, index) => (
            <div key={index} className={cx("checkbox-item")}>
              <Radio
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: "20px" },
                  "& ": { padding: "5px" },
                }}
                name={data.name}
                checked={checkInput.status === data.label}
                onChange={() => {
                  setCheckInput({
                    ...checkInput,
                    status: data.label,
                    statusData:
                      data.label === "Tất cả"
                        ? checkStatusInput
                            .filter((value) => {
                              return value.label !== "Tất cả";
                            })
                            .map((value) => {
                              return value.label;
                            })
                        : [data.label],
                  });
                }}
              />
              <label htmlFor={data.name}>{data.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className={cx("gate")}>
        <h4>Cổng Check-in</h4>
        <div className={cx("checkbox")}>
          <div className={cx("checkbox-item")}>
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": { fontSize: "20px" },
                "& ": { padding: "5px" },
              }}
              onChange={() => {
                setCheckInput({
                  ...checkInput,
                  gate: !checkInput.gate,
                  gateData: !checkInput.gate
                    ? checkGateInput.map((value) => {
                        return value.label;
                      })
                    : [],
                });
              }}
              checked={checkInput.gate}
              type="checkbox"
              id="gate_all"
              name="gate_all"
            />
            <label htmlFor="gate_all">Tất cả</label>
          </div>

          {checkGateInput.map((data, index) => (
            <div key={index} className={cx("checkbox-item")}>
              <Checkbox
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: "20px" },
                  "& ": { padding: "5px" },
                }}
                onChange={() => {
                  setCheckInput({
                    ...checkInput,
                    gateData: checkInput.gateData.includes(data.label)
                      ? checkInput.gateData.filter((value) => {
                          return value !== data.label;
                        })
                      : [...checkInput.gateData, data.label],
                  });
                }}
                name={data.name}
                disabled={checkInput.gate}
                checked={checkInput.gateData.includes(data.label)}
              />
              <label htmlFor={data.name}>{data.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className={cx("button")}>
        <span
          onClick={() =>
            handleFilter({
              dateFilter,
              checkStatus: checkInput.statusData,
              checkGate: checkInput.gateData,
            })
          }>
          <Button className={cx("")}>Lọc</Button>
        </span>
      </div>
    </div>
  );
};

export default TicketFilter;
