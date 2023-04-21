/** @format */

import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { BsSearch } from "react-icons/bs";
const cx = classNames.bind(styles);

const Search = ({ placeholder, onChange, disabled }) => {
  return (
    <div className={cx("wrapper")}>
      <input
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        spellCheck={false}
      />
      <BsSearch className={cx("icon")} />
    </div>
  );
};

export default Search;
