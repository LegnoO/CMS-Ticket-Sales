/** @format */
import "./datePicker.css";
import { useState, useEffect } from "react";
import { fetchTicket } from "../../features/ticketSlice";
import { FiFilter } from "react-icons/fi";
import { GoPrimitiveDot } from "react-icons/go";
import { dateFormat } from "../../util/dateFormat";
import { useDispatch, useSelector } from "react-redux";
import { FiMoreVertical } from "react-icons/fi";
import { exportToExcel } from "../../util/exportToExcel";
import classNames from "classnames/bind";
import styles from "./TicketList.module.scss";
import Search from "../../components/Search";
import ReactPaginate from "react-paginate";
import Button from "../../components/Button";
import TicketFilter from "../../components/Layout/components/Modal/TicketFilter";
import TicketUpdate from "../../components/Layout/components/Modal/TicketUpdate";
import ModalWrapper from "../../components/Layout/components/Modal/ModalWrapper";

const cx = classNames.bind(styles);

const TicketList = () => {
  const dispatch = useDispatch();
  const [modalFilter, setModalFilter] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [updateTicket, setUpdateTicket] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading } = useSelector((state) => state.ticketSlice);

  const [searchTerm, setSearchTerm] = useState([]);
  const ticketStatus = (data) => {
    const status = data;
    let statusClass = cx("");
    if (status === "Hết hạn") {
      statusClass = cx("red");
    } else if (status === "Chưa sử dụng") {
      statusClass = cx("green");
    } else if (status === "Đã sử dụng") {
      statusClass = cx("normal");
    }
    return (
      <td id={cx(["status"])} className={statusClass}>
        <Button iconLeft icon={<GoPrimitiveDot />}>
          {data}
        </Button>
      </td>
    );
  };

  const handleSearchInput = (e) => {
    setSearchTerm(
      data.filter((value) => {
        return value.data.ticket_number.includes(e.target.value);
      })
    );
  };

  const handleConvertDataExcel = () => {
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
    exportToExcel(newData, "Excel export");
  };

  const handleFilter = ({ dateFilter, checkStatus, checkGate }) => {
    setSearchTerm(
      data.filter((value) => {
        return (
          ((value.data.date_use.seconds >= dateFilter.startDate &&
            value.data.date_use.seconds <= dateFilter.endDate) ||
            (value.data.issuance_date.seconds >= dateFilter.startDate &&
              value.data.issuance_date.seconds <= dateFilter.endDate)) &&
          checkStatus.includes(value.data.status) &&
          checkGate.includes(value.data.gate)
        );
      })
    );
  };

  useEffect(() => {
    dispatch(fetchTicket("ticket"));
  }, []);

  useEffect(() => {
    setSearchTerm(data);
  }, [data]);

  const titleTicket = [
    "STT",
    "Booking code",
    "Số vé",
    "Tên sự kiện",
    "Tình trạng sử dụng",
    "Ngày sử dụng",
    "Ngày xuất vé",
    "Cổng check - in",
    "",
  ];
  const handleToggleFilter = () => {
    setModalFilter((prev) => !prev);
  };
  const handleToggleEdit = () => {
    setModalEdit((prev) => !prev);
  };

  // Pagination Setup
  const dataPerPage = 4;
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
          key={data.id}
          className={cx("item")}>
          <td id="stt">{index + 1}</td>
          <td id="booking-code">{data.data.blocking_code}</td>
          <td id="ticket-number">{data.data.ticket_number}</td>
          <td id="event-name">{data.data.event}</td>
          {ticketStatus(data.data.status)}
          <td id={cx("date-use")}>{dateFormat(data.data.date_use.seconds)}</td>
          <td id={cx("issuance_date")}>
            {dateFormat(data.data.issuance_date.seconds)}
          </td>
          <td id="gate">{data.data.gate}</td>
          <td>
            <button
              onClick={(e) => {
                setUpdateTicket({
                  id: data.id,
                  blocking_code: data.data.blocking_code,
                  gate_type: data.data.gate_type,
                  event: data.data.event,
                  number: data.data.ticket_number,
                  date: data.data.issuance_date,
                });
                e.preventDefault();
                handleToggleEdit((prev) => !prev);
              }}
              className={cx("edit-button")}>
              <FiMoreVertical />
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={cx("wrapper")}>
      <ModalWrapper isOpen={modalFilter} toggleModal={handleToggleFilter}>
        <TicketFilter
          toggleModal={handleToggleFilter}
          handleFilter={handleFilter}
        />
      </ModalWrapper>

      <ModalWrapper
        width="610px"
        isOpen={modalEdit}
        toggleModal={handleToggleEdit}>
        <TicketUpdate toggleModal={handleToggleEdit} data={updateTicket} />
      </ModalWrapper>

      <h2>Danh sách vé</h2>
      <div className={cx("nav")}>
        <Search
          className={cx("search-nav")}
          placeholder="Tìm bằng số vé"
          onChange={handleSearchInput}
          disabled={isLoading}
        />
        <div className={cx("action-btn")}>
          <span onClick={handleToggleFilter}>
            <Button
              borderColor="#ff993c"
              color="#ff993c"
              iconLeft
              icon={<FiFilter />}>
              Lọc vé
            </Button>
          </span>

          <Button
            borderColor="#ff993c"
            color="#ff993c"
            className={cx("export-btn")}
            onClick={handleConvertDataExcel}>
            Xuất file (.csv)
          </Button>
        </div>
      </div>

      <div className={cx("data-list")}>
        <table>
          <thead>
            <tr className={cx("thread")}>
              {titleTicket.map((data, index) => (
                <th key={index} className={cx("title")}>
                  {data}
                </th>
              ))}
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
    </div>
  );
};

export default TicketList;
