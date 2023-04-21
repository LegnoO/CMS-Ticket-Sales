/** @format */

import classNames from "classnames/bind";
import styles from "./ModalWrapper.module.scss";
import styled from "styled-components";

const cx = classNames.bind(styles);

const StyledDiv = styled.div`
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const ModalWrapper = ({ children, isOpen, toggleModal, width }) => {
  const handleToggle = () => {
    toggleModal();
  };
  return (
    <>
      {isOpen && (
        <div className={cx("wrapper")} onClick={handleToggle}>
          <StyledDiv
            onClick={(e) => e.stopPropagation()}
            width={width}
            className={cx("inner")}>
            <div className={cx("content")}>
              <div onClick={handleToggle} className={cx("close")}>
                &times;
              </div>
              {children}
            </div>
          </StyledDiv>
        </div>
      )}
    </>
  );
};

export default ModalWrapper;
