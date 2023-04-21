/** @format */

import styled from "styled-components";

const StyledInput = styled.input`
  border: 1px solid #a5a8b1;
  padding: 5px 5px 5px 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  color: #000;
  font-size: 13px;
  font-weight: 400;
  font-style: normal;
`;

const Input = ({ onChange, placeholder, type }) => {
  return (
    <>
      <StyledInput type={type} placeholder={placeholder} onChange={onChange} />
    </>
  );
};

export default Input;
