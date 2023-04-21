/** @format */

import React, { useState, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./TicketUpdate.module.scss";
import Button from "../../../../Button";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";

import DateInput from "../../../../Input/InputDate";

import { useDispatch } from "react-redux";
import { updateDateTicket } from "../../../../../services/api";
import { fetchTicket } from "../../../../../features/ticketSlice";
const cx = classNames.bind(styles);

const TicketUpdate = ({ data, toggleModal }) => {
  const dispatch = useDispatch();
  const [defaultDate, setDefaultDate] = useState(
    new Date(data.date.seconds * 1000)
  );
  const inputRef = useRef();

  const handleUpdateTicket = async () => {
    await updateDateTicket(data.id, { issuance_date: defaultDate });
    dispatch(fetchTicket("ticket"));
  };

  const handleToggleModal = () => {
    toggleModal();
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("top")}>
          <h4>Đổi ngày sử dụng vé</h4>
        </div>
        <div className={cx("content")}>
          <div className={cx("title")}>
            <ul>
              <li>Số vé</li>
              <li>Loại vé</li>
              <li>Tên sự kiện</li>
              <li>Hạn sử dụng</li>
            </ul>
          </div>
          <div className={cx("data")}>
            <ul>
              <li>{data.blocking_code}</li>
              <li>{data.gate_type}</li>
              <li>{data.event}</li>
              <li>
                <DatePicker
                  selected={defaultDate.setHours(0, 0, 0, 0)}
                  onChange={(date) => {
                    setDefaultDate(date);
                  }}
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <DateInput
                      icon={<FaCalendarAlt style={{ color: "#FF993C" }} />}
                      ref={inputRef}
                    />
                  }
                />
              </li>
            </ul>
          </div>
        </div>
        <div className={cx("bottom")}>
          <Button onClick={handleToggleModal}>Hủy</Button>
          <Button
            backgroundColor="#FF993C"
            color="#fff"
            onClick={handleUpdateTicket}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketUpdate;
