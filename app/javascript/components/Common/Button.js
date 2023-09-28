import React from "react";
import { StyledButton } from "../styles/Common/Button";

const Button = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
