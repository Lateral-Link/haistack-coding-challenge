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
  border: 1px solid blue; 
  background-color: white;

  &.active {
    font-weight: bold;
    color: white; 
    background-color: blue;  
    border: 1px solid blue; 
  }
`;
