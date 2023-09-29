import styled from 'styled-components';

export const PaginationNumbersContainer = styled.div`
  display: flex;
  margin: 10px 0;
`;

export const PageNumber = styled.span`
  cursor: pointer;
  margin: 0 5px;
  font-size: 16px;
  padding: 5px 10px;
  border: 1px solid #000; 
  background-color: white;

  &.active {
    font-weight: bold;
    color: white; 
    background-color: #1f8b99;  
    border: 1px solid #000; 
  }
`;
