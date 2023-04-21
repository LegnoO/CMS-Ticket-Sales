/** @format */

import classNames from "classnames/bind";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import styles from "./AddTicket.module.scss";
import Button from "../../components/Button";
import { useState } from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers/";
import { InputAdornment, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

import { updatePackageTicket } from "../../services/api";
import { fetchPackageTicket } from "../../features/packageSlice";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const cx = classNames.bind(styles);

const UpdateTicket = ({ dataProp, toggleModal }) => {
  const [data, setData] = useState(dataProp);
  const dispatch = useDispatch();
  const [datePickerStart, setDateStart] = useState(false);
  const [datePickerEnd, setDateEnd] = useState(false);
  const [checkPackage, setCheckPackage] = useState(data.price ? false : true);
  const [checkCombo, setCheckCombo] = useState(data.combo_price ? false : true);

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
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    updatePackageTicket(data.id, data);
    dispatch(fetchPackageTicket("package-ticket"));
  };
  return (
    <>
      <div className={cx("wrapper")} onClick={handleClickAnyway}>
        <div className={cx("inner")}>
          <h2>Cập nhật thông tin</h2>
          <div className={cx("ticket-name")}>
            <div className={cx("id")}>
              <h4>Mã sự kiện</h4>
              <TextField
                value={data.event_id}
                required
                name="event_id"
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
                value={data.name}
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
                  value={dayjs(data.start_date.seconds * 1000)}
                  onChange={(date) =>
                    setData((prev) => ({
                      ...prev,
                      start_date: { seconds: date / 1000 },
                    }))
                  }
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
                  value={dayjs(data.start_date.seconds * 1000)}
                  onChange={(date) =>
                    setData((prev) => ({
                      ...prev,
                      start_date: { seconds: date / 1000 },
                    }))
                  }
                  required
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
                  value={dayjs(data.end_date.seconds * 1000)}
                  onChange={(date) =>
                    setData((prev) => ({
                      ...prev,
                      end_date: { seconds: date / 1000 },
                    }))
                  }
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
                  value={dayjs(data.end_date.seconds * 1000)}
                  onChange={(date) =>
                    setData((prev) => ({
                      ...prev,
                      end_date: { seconds: date / 1000 },
                    }))
                  }
                  required
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
                defaultChecked={data.price ? true : false}
                onChange={() => setCheckPackage((prev) => !prev)}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              />
              <label>Vé lẻ (vnđ/vé) với giá</label>
              <TextField
                type="number"
                required
                name="price"
                defaultValue={data.price}
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
                defaultChecked={data.combo_price ? true : false}
                onChange={() => setCheckCombo((prev) => !prev)}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              />
              <label>Combo vé với giá</label>
              <TextField
                type="number"
                required
                value={data.combo_price}
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
                value={data.amount}
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
              defaultValue={data.status}
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
              onClick={() => handleSubmit(data)}
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

export default UpdateTicket;
