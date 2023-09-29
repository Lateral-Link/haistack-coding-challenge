import styled from "styled-components";

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
  margin-right: 15%;
  margin-left: 15%;

  &:nth-child(even) {
    background-color: #f0f9fa;
  }
`;

export const TableCell = styled.div`
  flex: 1;

  &.candidate-name,
  &.candidate-email,
  &.candidate-date-of-birth,
  &.candidate-link {
    padding: 20px 0 10px 0;
  }

  &.candidate-link {
    display: flex;
    gap: 10px;
    align-items: center;

    a {
      color: #fff;
      background-color: #000;
      border-radius: 8px;
      padding: 8px;
      border: 1px solid #000;
      width: auto;
      text-decoration: none;
      transition: background-color 0.3s;

      &:hover {
        background-color: #333;
      }
    }
  }
`;
