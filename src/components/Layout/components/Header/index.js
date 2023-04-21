/** @format */

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Search from "../../../Search";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("left")}>
        <Search placeholder="Search..." />
      </div>
      <div className={cx("right")}>
        <div className={cx("action")}>
          <AiOutlineMail />
          <IoIosNotificationsOutline />
          <div className={cx("avatar")}>
            <img
              src="https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.6435-9/97422931_1091843461182849_8761038478390591488_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=174925&_nc_ohc=6IT_5Ffje2oAX8EW5wC&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfAYbuqXO_-ueOKUxh0mUxuBh49fZJfMraslrzdYvaqgiw&oe=6462594D"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
