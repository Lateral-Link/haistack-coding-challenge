import React, { useState, useEffect } from "react";
import axios from "axios";
import Candidate from "./Candidate";
import Tableheader from "./TableHeader";
import PaginationNumbers from "../Common/PaginationNumbers";
import {
  PaginationContainer,
  PaginationButton,
  PaginationControl,
  Home,
  Header,
  Subheader,
  CreateCandidateLink,
  SearchInput,
  CandidateCount,
  Wrapper,
} from "../styles/Candidates/Candidates";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [sort, setSort] = useState({ column: "name", order: "asc" });
  const [url, setUrl] = useState(`/api/v1/candidates.json`);
  const [candidateCount, setCandidateCount] = useState(0);

  useEffect(() => {
    let updatedUrl = `/api/v1/candidates.json?page=${currentPage}&term=${searchTerm}`;

    if (sort.column) {
      updatedUrl += `&order_column=${sort.column}&order_direction=${sort.order}`;
    }

    setUrl(updatedUrl);

    axios
      .get(updatedUrl)
      .then((resp) => {
        const data = resp.data;
        setCandidates(data.candidates);
        setTotalPages(data.total_pages);
        setCandidateCount(data.candidates_size);
        setSearchResult(data.candidates.length === 0 ? "not-found" : null);
      })
      .catch((resp) => console.log(resp));
  }, [currentPage, searchTerm, sort]);

  const handleDeleteCandidate = (id) => {
    const url = `/api/v1/candidates/${id}`;
    axios.delete(url).then((response) => {
      if (response.status === 204) {
        console.log("Candidate deleted successfully");
        setCandidates((prevCandidates) =>
          prevCandidates.filter((candidate) => candidate.id !== id)
        );
        setCandidateCount((prevCount) => prevCount - 1);
      } else {
        console.error("Error deleting candidate:", response.statusText);
      }
    });
  };

  const handleSort = (column) => {
    if (sort.column === column) {
      setSort((prevSort) => ({
        ...prevSort,
        order: prevSort.order === "asc" ? "desc" : "asc",
      }));
    } else {
      setSort({ column, order: "asc" });
    }
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    const column = sort.column;
    const order = sort.order === "asc" ? 1 : -1;

    if (a[column] < b[column]) {
      return -order;
    }
    if (a[column] > b[column]) {
      return order;
    }
    return 0;
  });

  const table = sortedCandidates.map((item) => {
    return (
      <Candidate
        key={item.id}
        name={item.name}
        email={item.email}
        date_of_birth={item.date_of_birth}
        id={item.id}
        onDelete={handleDeleteCandidate}
      />
    );
  });

  return (
    <Home>
      <Header>
        <h1>Candidates Manager</h1>
        <Subheader>Candidates List</Subheader>
      </Header>
      <Wrapper>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CreateCandidateLink to={`/candidate/new`}>
          Create candidate
        </CreateCandidateLink>
      </Wrapper>
      {searchResult === "not-found" ? (
        <p>Candidate not found</p>
      ) : (
        <>
          {candidates.length > 0 && (
            <>
              <Tableheader onSort={handleSort} sort={sort} />
              {table}
              <PaginationContainer>
                <PaginationControl>
                  <PaginationButton
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </PaginationButton>
                  <PaginationNumbers
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageClick={(page) => setCurrentPage(page)}
                  />
                  <PaginationButton
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </PaginationButton>
                </PaginationControl>
                <CandidateCount>
                  Total Candidates: {candidateCount}
                </CandidateCount>
              </PaginationContainer>
            </>
          )}
        </>
      )}
    </Home>
  );
};

export default Candidates;
