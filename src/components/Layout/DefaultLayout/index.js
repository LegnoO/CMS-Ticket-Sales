/** @format */

import { groupAndSortDataByDate } from "../../../util/dateFormat";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const data = [
    {
      date: "2023-01-07",
      revenue: 1000,
      day_of_week: "2",
      ticket_type: "family",
    },
    {
      date: "2023-01-08",
      revenue: 1000,
      day_of_week: "4",
      ticket_type: "event",
    },
    {
      date: "2023-01-09",
      revenue: 1000,
      day_of_week: "7",
      ticket_type: "event",
    },
    {
      date: "2023-01-10",
      revenue: 1000,
      day_of_week: "5",
      ticket_type: "event",
    },
    {
      date: "2023-01-11",
      revenue: 1000,
      day_of_week: "4",
      ticket_type: "event",
    },
    {
      date: "2023-02-07",
      revenue: 1000,
      day_of_week: "2",
      ticket_type: "event",
    },
    {
      date: "2023-02-08",
      revenue: 1000,
      day_of_week: "1",
      ticket_type: "event",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <Sidebar />
      <div className={cx("inner")}>
        <Header />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
