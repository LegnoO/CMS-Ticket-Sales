/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackageTicket } from "../../features/packageSlice";
import { FiFilter } from "react-icons/fi";
import { dateFormat, timeFormat } from "../../util/dateFormat";
import classNames from "classnames/bind";
import styles from "./Setting.module.scss";
import Button from "../../components/Button";
import Search from "../../components/Search";
import AddTicket from "./AddTicket";
import UpdateTicket from "./UpdateTicket";
import { exportToExcel } from "../../util/exportToExcel";
import ModalWrapper from "../../components/Layout/components/Modal/ModalWrapper";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { formatCurrencyToVND } from "../../util/formatCurrency";
import ReactPaginate from "react-paginate";

const cx = classNames.bind(styles);

const Setting = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [updateTicket, setUpdateTicket] = useState({});
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModalUpdate, setToggleModalUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState([]);
  const { data } = useSelector((state) => state.packageSlice);

  useEffect(() => {
    dispatch(fetchPackageTicket("package-ticket"));
  }, [dispatch]);

  useEffect(() => {
    setSearchTerm(data);
  }, [data]);

  const handleToggleModal = () => {
    setToggleModal((prev) => !prev);
  };
  const handleToggleModalUpdate = () => {
    setToggleModalUpdate((prev) => !prev);
  };
  const handleSearch = (e) => {
    setSearchTerm(
      data.filter((value) => {
        return value.data.event_id.includes(e.target.value);
      })
    );
  };
  const handleConvertDataExcel = () => {
    const newData = data.map(
      ({
        data: {
          start_date: { seconds: startDateSeconds },
          end_date: { seconds: endDateSeconds },
          ...rest
        },
      }) => ({
        ...rest,
        start_date: dateFormat(startDateSeconds),
        end_date: dateFormat(endDateSeconds),
      })
    );
    exportToExcel(newData, "Excel export");
  };

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
          <td>{index + 1}</td>
          <td>{data.data.event_id}</td>
          <td>{data.data.name}</td>
          <td className="text-end">
            <p>{dateFormat(data.data.start_date.seconds)}</p>
            <p>{timeFormat(data.data.start_date.seconds)}</p>
          </td>
          <td className="text-end">
            <p>{dateFormat(data.data.end_date.seconds)}</p>
            <p>{timeFormat(data.data.end_date.seconds)}</p>
          </td>
          <td className="text-end">
            {data.data.price ? (
              <span>{formatCurrencyToVND(data.data.price)} VNĐ</span>
            ) : (
              ""
            )}
          </td>
          <td className="text-start">
            {data.data.combo_price ? (
              <>
                <span>{formatCurrencyToVND(data.data.combo_price)} VNĐ</span>
                <span>/{data.data.amount} Vé</span>
              </>
            ) : (
              ""
            )}
          </td>
          <td>{data.data.status}</td>
          <td>
            <span
              onClick={() => {
                handleToggleModalUpdate();
                setUpdateTicket({
                  id: data.id,
                  event_id: data.data.event_id,
                  name: data.data.name,
                  start_date: data.data.start_date,
                  end_date: data.data.end_date,
                  price: data.data.price,
                  combo_price: parseInt(data.data.combo_price),
                  amount: data.data.amount,
                  status: data.data.status,
                });
              }}
              className={cx("update-button")}>
              <BorderColorIcon /> Cập nhật
            </span>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <ModalWrapper isOpen={toggleModal} toggleModal={handleToggleModal}>
        <AddTicket toggleModal={handleToggleModal} />
      </ModalWrapper>
      <ModalWrapper
        isOpen={toggleModalUpdate}
        toggleModal={handleToggleModalUpdate}>
        <UpdateTicket
          toggleModal={handleToggleModalUpdate}
          dataProp={updateTicket}
        />
      </ModalWrapper>
      <div className={cx("wrapper")}>
        <div className={cx("inner")}>
          <div className={cx("content")}>
            <h2>Danh sách gói vé</h2>
            <div className={cx("nav")}>
              <Search
                className={cx("search-nav")}
                placeholder="Tìm bằng số vé"
                onChange={handleSearch}
              />
              <div className={cx("action-btn")}>
                <span>
                  <Button
                    onClick={handleConvertDataExcel}
                    borderColor="#ff993c"
                    color="#ff993c"
                    iconLeft
                    icon={<FiFilter />}>
                    Xuất file (.csv)
                  </Button>
                </span>

                <Button
                  borderColor="#ff993c"
                  color="#ff993c"
                  className={cx("export-btn")}
                  onClick={handleToggleModal}>
                  Thêm gói vé
                </Button>
              </div>
            </div>
            <table>
              <thead>
                <tr className={cx("thread")}>
                  <th>STT</th>
                  <th className="text-start">Mã gói</th>
                  <th className="text-start">Tên gói vé</th>
                  <th className="text-end">Ngày áp dụng</th>
                  <th className="text-end">Ngày hết hạn</th>
                  <th className="text-end">Giá vé (VND/vé)</th>
                  <th className="text-start">Giá Combo (VND/Combo)</th>
                  <th className="text-start">Tình trạng</th>
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
        </div>
      </div>
    </>
  );
};

export default Setting;
