/** @format */

import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./TicketControl.module.scss";
import Sidebar from "../../components/Layout/components/Sidebar";
import Header from "../../components/Layout/components/Header";
import DateInput from "../../components/Input/InputDate";
import Search from "../../components/Search";
import DatePicker from "react-datepicker";
import Button from "../../components/Button";
import { Radio } from "@mui/material";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicket } from "../../features/ticketSlice";
import { FaCalendarAlt } from "react-icons/fa";
import { dateFormat } from "../../util/dateFormat";
import { exportToExcel } from "../../util/exportToExcel";

const cx = classNames.bind(styles);

const TicketControl = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [checkBox, setCheckbox] = useState({
    data: ["Đã đối soát", "Chưa đối soát"],
    status: "Tất cả",
  });
  const [filterData, setFilterData] = useState({
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(0, 0, 0, 0)),
  });

  const inputRef = useRef();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.ticketSlice);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect(() => {
    dispatch(fetchTicket("ticket"));
  }, []);

  useEffect(() => {
    setSearchTerm(data);
  }, [data]);

  const titleCheckBox = ["Tất cả", "Đã đối soát", "Chưa đối soát"];

  const titleTicket = [
    "STT",
    "Số vé",
    "Tên sự kiện",
    "Ngày sử dụng",
    "Loại vé",
    "Cổng",
    "",
  ];

  const handleFilter = (filterData, checkBox) => {
    const startDate = filterData.startDate / 1000;
    const endDate = filterData.endDate / 1000;
    const status = checkBox.data;

    setSearchTerm(
      data.filter((value) => {
        return (
          value.data.date_use.seconds >= startDate &&
          value.data.date_use.seconds <= endDate &&
          status.includes(value.data.control_status)
        );
      })
    );
  };

  const handleSearchInput = (e) => {
    setSearchTerm(
      data.filter((value) => {
        return value.data.ticket_number.includes(e.target.value);
      })
    );
  };

const handleConvertDataExcel = () =>{
  const newData = data.map(
    ({
      data: {
        date_use: { seconds: startDateSeconds },
        issuance_date: { seconds: endDateSeconds },
        ...rest
      },
    }) => ({
      ...rest,
      date_use: dateFormat(startDateSeconds),
      issuance_date: dateFormat(endDateSeconds),
    })
  );
  exportToExcel(newData, "Excel export")
}

  // Pagination Setup
  const dataPerPage = 8;
  const pagesVisited = currentPage * dataPerPage;
  const pageCount = Math.ceil(searchTerm.length / dataPerPage);
  const handleChangePage = (e) => {
    setCurrentPage(e.selected);
  };

  // Pagination render data
  const renderData = () => {
    const sliceData = searchTerm.slice(
      pagesVisited,
      pagesVisited + dataPerPage
    );
    return sliceData.map((data, index) => {
      return (
        <tr
          style={
            index % 2 === 0
              ? { backgroundColor: "#FFF" }
              : { backgroundColor: "#F7F8FB" }
          }
          key={index}
          className={cx("item")}>
          <td className="text-center">{index + 1}</td>
          <td>{data.data.ticket_number}</td>
          <td>{data.data.event}</td>
          <td id={cx("date_use")}>{dateFormat(data.data.date_use.seconds)}</td>
          <td>{data.data.gate_type}</td>
          <td>{data.data.gate}</td>
          <td id={cx("control_status")}>
            <i>{data.data.control_status}</i>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={cx("wrapper")}>
      <Sidebar />
      <div className={cx("inner")}>
        <Header />
        <div className={cx("content")}>
          <div className={cx("list")}>
            <div className={cx("nav")}>
              <h2>Danh sách vé</h2>
              <div className={cx("action")}>
                <Search
                  className={cx("search-nav")}
                  placeholder="Tìm bằng số vé"
                  onChange={handleSearchInput}
                />
                <Button onClick={handleConvertDataExcel} borderColor="#ff993c" color="#ff993c">
                  Chốt đối soát
                </Button>
              </div>
            </div>
            <table>
              <thead>
                <tr className={cx("thread")}>
                  <th>STT</th>
                  <th>Số vé</th>
                  <th>Tên sự kiện</th>
                  <th>Ngày sử dụng</th>
                  <th>Loại vé</th>
                  <th>Cổng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className={cx("list")}>{renderData()}</tbody>
            </table>
            <ReactPaginate
              previousLabel={"◄"}
              nextLabel={"►"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handleChangePage}
              containerClassName={cx("pagination")}
              subContainerClassName={"pages pagination"}
              activeClassName={cx("page-active")}
            />
          </div>
          <div className={cx("filter")}>
            <h2>Lọc vé</h2>

            <div className={cx("status")}>
              <ul className={cx("title")}>
                <li>Tình trạng đối soát</li>
              </ul>
              <ul className={cx("checkbox")}>
                {titleCheckBox.map((title, index) => (
                  <li key={index}>
                    <label>
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": { fontSize: "20px" },
                          "& ": { padding: "5px" },
                        }}
                        onChange={() =>
                          setCheckbox({
                            ...checkBox,
                            status: title,
                            data:
                              title === "Tất cả"
                                ? titleCheckBox
                                    .filter((value) => {
                                      return value !== "Tất cả";
                                    })
                                    .map((value) => {
                                      return value;
                                    })
                                : [title],
                          })
                        }
                        checked={title === checkBox.status}
                        type="radio"
                      />
                      {title}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className={cx("date")}>
              <ul className={cx("title")}>
                <li>Loại vé</li>
                <li>Từ ngày</li>
                <li>Đến ngày</li>
              </ul>
              <ul className={cx("checkbox")}>
                <li>Vé cổng</li>
                <li>
                  <DatePicker
                    selected={filterData.startDate}
                    onChange={(date) => {
                      setFilterData({ ...filterData, startDate: date });
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
                <li>
                  <DatePicker
                    selected={filterData.endDate}
                    onChange={(date) => {
                      setFilterData({ ...filterData, endDate: date });
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
            <div
              onClick={() => handleFilter(filterData, checkBox)}
              className={cx("submit")}>
              <Button color="#FF993C" borderColor="#FF993C">
                Lọc
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketControl;
