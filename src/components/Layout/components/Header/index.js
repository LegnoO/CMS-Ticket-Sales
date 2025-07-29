/** @format */

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Search from "../../../Search";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { images } from '../../../../assets/images';

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
               src={images.avatar}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
