import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: #fff;
  background-color: #000;
  border-radius: 8px;
  padding: 10px 18px;
  border: 1px solid #000;
  width: auto;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }
`

const Button = ({onClick, children}) => {
  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button
