import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
`;

export const CandidateInfo = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: inline-block;
  text-align: left;
`;

export const CandidateName = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const CandidateEmail = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const CandidateDOB = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 10px;
`;

export const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const DropdownList = styled.ul`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 8px 0;
  z-index: 1;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const DropdownItem = styled.li`
  cursor: pointer;
  padding: 10px 20px;

  &:hover {
    background-color: #ddd;
  }

  button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    margin: 0;
    color: #333;
  }
`;