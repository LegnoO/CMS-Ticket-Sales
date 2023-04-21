/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsTicketPerforated } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { TbFileInvoice } from "react-icons/tb";import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import Button from "../../../Button";
const cx = classNames.bind(styles);

const Sidebar = () => {
  const [active, setActive] = useState();
  const menuItem = [
    {
      text: "Trang chủ",
      icon: <AiOutlineHome />,
      to: "/",
    },
    {
      text: "Quản lý vé",
      icon: <BsTicketPerforated />,
      to: "/list",
    },
    {
      text: "Đối soát vé",
      icon: <TbFileInvoice />,
      to: "/control",
    },
    {
      text: "Cài đặt",
      icon: <FiSettings />,
      to: "/setting",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <Link to="/">
          <img
            src="https://scontent.xx.fbcdn.net/v/t1.15752-9/335968345_131426836542206_8133676188727322024_n.png?_nc_cat=105&ccb=1-7&_nc_sid=aee45a&_nc_ohc=7X97Y2sJ1bEAX9GYtK5&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdT84pz1gG-u4zQFp83GqYsIOX77A-hHVI5bxQ2EyVqmyA&oe=646519EC"
            alt=""
          />
        </Link>
      </div>

      <div className={cx("menu")}>
        <ul className={cx("list")}>
          {menuItem.map((data, index) => (
            <li
              key={index}
              onClick={() => {
                setActive(index);
              }}
              className={cx(["item", active === index ? "active" : undefined])}>
              {/* className={cx("item","active")}> */}
              <Button
                onClick={data.onClick}
                contentLeft
                iconLeft
                icon={data.icon}
                to={data.to}>
                {data.text}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
