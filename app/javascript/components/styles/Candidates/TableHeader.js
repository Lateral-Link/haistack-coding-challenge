import styled from 'styled-components'

export const TableHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
  font-weight: bold;
  `

export const TableCell = styled.div`
  flex: 1;
`  

export const ClickableText = styled.span`
  cursor: pointer;
  color: #333;

  &:hover {
    text-decoration: underline;
  }
`