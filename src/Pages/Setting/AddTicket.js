/** @format */

import { useDispatch } from "react-redux";
import { fetchPackageTicket } from "../../features/packageSlice";
import { useState } from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers/";
import { InputAdornment, TextField } from "@mui/material";
import { addPackage } from "../../services/api";
import classNames from "classnames/bind";
import styles from "./AddTicket.module.scss";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import Button from "../../components/Button";
import Checkbox from "@mui/material/Checkbox";

const cx = classNames.bind(styles);
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddTicket = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const [checkCombo, setCheckCombo] = useState(true);
  const [checkPackage, setCheckPackage] = useState(true);
  const [datePickerStart, setDateStart] = useState(false);
  const [datePickerEnd, setDateEnd] = useState(false);
  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    start_date: "",
    end_date: "",
    price: "",
    combo_price: "",
    status: "",
  });
  const handleClickAnyway = () => {
    if (datePickerStart) {
      setDateStart(false);
    }
    if (datePickerEnd) {
      setDateEnd(false);
    }
  };

  const handleInputData = (event) => {
    const { value, name } = event.target;

    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (inputData) => {
    addPackage(inputData);
    dispatch(fetchPackageTicket("package-ticket"));
  };

  return (
    <>
      <div className={cx("wrapper")} onClick={handleClickAnyway}>
        <div className={cx("inner")}>
          <h2>Thêm gói vé</h2>
          <div className={cx("ticket-name")}>
            <div className={cx("id")}>
              <h4>Mã sự kiện</h4>
              <TextField
                required
                name="id"
                onChange={handleInputData}
                placeholder="Nhập tên gói vé"
                sx={{
                  "&.MuiFormControl-root .MuiInputBase-input": {
                    padding: "12px 13px",
                    width: "165px",
                    fontSize: "12px",
                  },
                }}
              />
            </div>
            <div className={cx("event")}>
              <h4>Tên sự kiện</h4>

              <TextField
                required
                name="name"
                placeholder="Hội chợ triển lãm hàng tiêu dùng 2021"
                sx={{
                  "&.MuiFormControl-root .MuiInputBase-input": {
                    padding: "12px 13px",
                    width: "125px",
                    fontSize: "12px",
                  },
                }}
                onChange={handleInputData}
              />
            </div>
          </div>
          <div className={cx("pick-date")}>
            <div className={cx("start-date")}>
              <h4>Ngày áp dụng</h4>
              <div>
                <DatePicker
                  required
                  sx={{
                    "&.MuiFormControl-root .MuiSvgIcon-root": {
                      color: "#FF993C",
                    },
                    "&.MuiFormControl-root .MuiInputBase-input": {
                      padding: "12px 13px",
                      width: "76px",
                    },
                  }}
                  onChange={(date) =>
                    setInputData((prev) => ({ ...prev, start_date: date }))
                  }
                  value={inputData.start_date ? inputData.start_date : null}
                  format="DD/MM/YYYY"
                  open={datePickerStart}
                  onOpen={() => setDateStart(true)}
                  slotProps={{
                    // textField: {
                    //   onClick: (e) => {
                    //     e.stopPropagation();
                    //     setDateStart((prev) => !prev);
                    //   },
                    // },
                    openPickerButton: {
                      onClick: (e) => {
                        e.stopPropagation();
                        setDateStart((prev) => !prev);
                      },
                    },
                  }}
                />

                <TimePicker
                  required
                  value={inputData.start_date ? inputData.start_date : null}
                  onChange={(time) => {
                    setInputData((prev) => ({
                      ...prev,
                      start_date: time,
                    }));
                  }}
                  sx={{
                    "&.MuiFormControl-root .MuiSvgIcon-root": {
                      color: "#FF993C",
                    },
                    "&.MuiFormControl-root .MuiInputBase-input": {
                      padding: "12px 13px",
                      width: "66px",
                    },
                  }}
                  slotProps={{
                    textField: {
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <MoreTimeIcon />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className={cx("end-date")}>
              <h4>Ngày hết hạn</h4>
              <div>
                <DatePicker
                  required
                  sx={{
                    "&.MuiFormControl-root .MuiSvgIcon-root": {
                      color: "#FF993C",
                    },
                    "&.MuiFormControl-root .MuiInputBase-input": {
                      padding: "12px 13px",
                      width: "76px",
                    },
                  }}
                  onChange={(date) =>
                    setInputData((prev) => ({ ...prev, end_date: date }))
                  }
                  value={inputData.end_date ? inputData.end_date : null}
                  format="DD/MM/YYYY"
                  open={datePickerEnd}
                  onOpen={() => setDateEnd(true)}
                  slotProps={{
                    // textField: {
                    //   onClick: (e) => {
                    //     e.stopPropagation();
                    //     setDateStart((prev) => !prev);
                    //   },
                    // },
                    openPickerButton: {
                      onClick: (e) => {
                        e.stopPropagation();
                        setDateEnd((prev) => !prev);
                      },
                    },
                  }}
                />

                <TimePicker
                  required
                  value={inputData.end_date ? inputData.end_date : null}
                  onChange={(time) => {
                    setInputData((prev) => ({
                      ...prev,
                      end_date: time,
                    }));
                  }}
                  sx={{
                    "&.MuiFormControl-root .MuiSvgIcon-root": {
                      color: "#FF993C",
                    },
                    "&.MuiFormControl-root .MuiInputBase-input": {
                      padding: "12px 13px",
                      width: "66px",
                    },
                  }}
                  slotProps={{
                    textField: {
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <MoreTimeIcon />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className={cx("apply-pice")}>
            <h4>Giá vé áp dụng</h4>
            <div className={cx("single")}>
              <Checkbox
                {...label}
                onChange={() => setCheckPackage((prev) => !prev)}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              />
              <label>Vé lẻ (vnđ/vé) với giá</label>
              <TextField
                type="number"
                required
                name="price"
                disabled={checkPackage}
                onChange={handleInputData}
                placeholder="Hội chợ triển lãm hàng tiêu dùng 2021"
                sx={{
                  "&.MuiFormControl-root .MuiInputBase-input": {
                    padding: "12px 13px",
                    width: "125px",
                    fontSize: "12px",
                  },
                }}
              />
              <span>/ vé</span>
            </div>
            <div className={cx("combo")}>
              <Checkbox
                {...label}
                onChange={() => setCheckCombo((prev) => !prev)}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              />
              <label>Combo vé với giá</label>
              <TextField
                required
                type="number"
                name="combo_price"
                onChange={handleInputData}
                disabled={checkCombo}
                placeholder="Hội chợ triển lãm hàng tiêu dùng 2021"
                sx={{
                  "&.MuiFormControl-root .MuiInputBase-input": {
                    padding: "12px 13px",
                    width: "125px",
                    fontSize: "12px",
                  },
                }}
              />

              <span>/</span>
              <TextField
                required
                type="number"
                name="amount"
                onChange={handleInputData}
                disabled={checkCombo}
                placeholder="Giá vé"
                sx={{
                  "&.MuiFormControl-root .MuiInputBase-input": {
                    padding: "12px 13px",
                    width: "38px",
                    fontSize: "12px",
                  },
                }}
              />
              <span> vé</span>
            </div>
            <div></div>
          </div>
          <div className={cx("status")}>
            <h4>Tình trạng</h4>
            <select
              name="status"
              defaultValue="empty"
              onChange={handleInputData}>
              <option disabled hidden value="empty"></option>
              <option disabled value="">
                Select Options
              </option>
              <option value="Tắt">Tắt</option>
              <option value="Đang áp dụng">Đang áp dụng</option>
            </select>
          </div>
          <div className={cx("button")}>
            <Button
              borderColor="#FF993C"
              backgroundColor="#fff"
              color="#FF993C"
              onClick={toggleModal}>
              Hủy
            </Button>
            <Button
              onClick={() => handleSubmit(inputData)}
              backgroundColor="#FF993C"
              color="#fff"
              borderColor="#FF993C">
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTicket;
