/** @format */

import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
import styled from "styled-components";

const cx = classNames.bind(styles);

// let StyledComponent = styled.button`
//   color: red;
// `;

const Button = ({
  children,
  icon,
  contentLeft,
  iconLeft,
  iconRight,
  className,
  to,
  onClick,
  backgroundColor,
  borderColor,
  color,
}) => {
  let Comp = "button";
  const props = {};
  // const Comp = to ? styled(Link)`` : StyledComponent;
  if (to) {
    Comp = Link;
    props.to = to;
  }

  if (onClick) {
    props.onClick = onClick;
  }

  const classes = cx("wrapper", {
    [className]: className,
    "content-left": contentLeft,
  });

  return (
    <Comp
      className={classes}
      {...props}
      style={{
        "--border-color": borderColor ? ` ${borderColor}` : "transparent",
        "--color": color ? ` ${color}` : "#000",
        "--background-color": backgroundColor
          ? ` ${backgroundColor}`
          : "transparent",
      }}>
      {iconLeft && <span className={cx("icon")}>{icon}</span>}
      <span className={cx("content")}>{children}</span>
      {iconRight && <span className={cx("icon")}>{icon}</span>}
    </Comp>
  );
};

export default Button;
