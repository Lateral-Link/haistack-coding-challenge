import React, { useState, useEffect } from "react";
import axios from "axios";
import Candidate from "./Candidate";
import Tableheader from "./TableHeader";
import ReactPaginate from "react-paginate";
import {
  PaginationContainer,
  PaginationButton,
  PaginationControll,
  Home,
  Header,
  Subheader,
  CreateCandidateLink,
  SearchInput,
} from "../styles/Candidates/Candidates";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [sort, setSort] = useState({ column: "name", order: "asc" });
  const [url, setUrl] = useState(
    `/api/v1/candidates.json?page=1&term=${searchTerm}`
  );

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
        setSearchResult(data.candidates.length === 0 ? "not-found" : null);
      })
      .catch((resp) => console.log(resp));
  }, [currentPage, searchTerm, sort]);

  const handleDeleteCandidate = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this candidate?"
    );
    const url = `/api/v1/candidates/${id}`;
    if (confirmed) {
      axios.delete(url).then((response) => {
        if (response.status === 204) {
          console.log("Candidate deleted successfully");
          setCandidates((prevCandidates) =>
            prevCandidates.filter((candidate) => candidate.id !== id)
          );
        } else {
          console.error("Error deleting candidate:", response.statusText);
        }
      });
    }
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
      <CreateCandidateLink to={`/candidate/new`}>
        Create candidate
      </CreateCandidateLink>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResult === "not-found" ? (
        <p>Candidate not found</p>
      ) : (
        <>
          {candidates.length > 0 && (
            <>
              <Tableheader onSort={handleSort} sort={sort} />
              {table}
              <PaginationContainer>
                <PaginationControll>
                  <PaginationButton
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </PaginationButton>
                  <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={({ selected }) =>
                      setCurrentPage(selected + 1)
                    }
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    previousLabel={""}
                    nextLabel={""}
                  />
                  <PaginationButton
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </PaginationButton>
                </PaginationControll>
              </PaginationContainer>
            </>
          )}
        </>
      )}
    </Home>
  );
};

export default Candidates;
