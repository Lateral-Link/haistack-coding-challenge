import styled from "styled-components";
import { Link } from "react-router-dom";

export const PaginationContainer = styled.div`
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
  }

  li {
    margin: 0 4px;
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
    border-radius: 4px;
    padding: 8px 12px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f5f5f5;
    }

    &.active {
      background-color: #007bff;
      color: #fff;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const PaginationButton = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  margin: 0 4px;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const PaginationControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Home = styled.div`
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden; 
`;
export const Header = styled.div`
  h1 {
    color: #1f8b99;
    font-size: 32px;
  }
`;
export const Subheader = styled.div`
  margin-top: -20px;
  font-weight: 300;
  font-size: 18px;
`;
export const CreateCandidateLink = styled(Link)`
  display: block;
  margin-top: 20px;
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  background-color: #2ab7c9;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #000;
  margin-right: 15%;

  &:hover {
    background-color: #1f8b99;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 40%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-top: 40px;
  margin-left: 180px;
  text-align: left;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const CandidateCount = styled.div`
  position: relative;
  left: 30%;
  font-weight: bold;
`;