import React from "react";
import { PaginationNumbersContainer, PageNumber } from "../styles/Common/PaginationNumbers";

const PaginationNumbers = ({ totalPages, currentPage, onPageClick }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationNumbersContainer>
      {pageNumbers.map((page) => (
        <PageNumber
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => onPageClick(page)}
        >
          {page}
        </PageNumber>
      ))}
    </PaginationNumbersContainer>
  );
};

export default PaginationNumbers;
