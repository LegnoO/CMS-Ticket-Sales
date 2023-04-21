/** @format */

import { forwardRef, useRef, useImperativeHandle } from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";
const cx = classNames.bind(styles);

const DateInput = forwardRef(({ value, onClick, icon }, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    blur: () => {
      inputRef.current.blur();
    },
  }));

  return (
    <div className={cx("wrapper")} onClick={onClick}>
      <input type="text" value={value} ref={inputRef} readOnly />
      {icon}
    </div>
  );
});

export default DateInput;
