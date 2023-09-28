import React, {useState, useEffect} from "react";
import axios from "axios";
import Candidate from './Candidate';
import Tableheader from "./TableHeader";
import ReactPaginate from 'react-paginate';
import { PaginationContainer, PaginationButton, PaginationControll, Home, Header, Subheader, CreateCandidateLink } from "../styles/Candidates/Candidates";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    axios.get(`/api/v1/candidates.json?page=${currentPage}`)
      .then(resp => {
        setCandidates(resp.data.candidates);
        setTotalPages(resp.data.total_pages);
      })
      .catch(resp => console.log(resp));
  }, [currentPage]);
  

  const handleDeleteCandidate = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this candidate?");
    const url = `/api/v1/candidates/${id}`;
    if (confirmed) {
      axios.delete(url)
        .then(response => {
          if (response.status === 204) {
            console.log('Candidate deleted successfully');
            setCandidates(prevCandidates => prevCandidates.filter(candidate => candidate.id !== id)); // Atualiza a lista removendo o candidato excluído
          } else {
            console.error('Error deleting candidate:', response.statusText);
          }
        });
    }
  }

  const table = candidates.map(item => {
    return (
      <Candidate 
      name={item.name}
      email={item.email}
      date_of_birth={item.date_of_birth}
      id={item.id}
      onDelete={handleDeleteCandidate}
      />
    )
  })

  return (
    <Home>
      <Header>
        <h1>Candidates Manager</h1>
        <Subheader>Candidates List</Subheader>
      </Header>
      <CreateCandidateLink to={`/candidate/new`}>Create candidate</CreateCandidateLink>
      <Tableheader />
      {table}
      <PaginationContainer>
      <PaginationControll> 
          <PaginationButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </PaginationButton>
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousLabel={""}
            nextLabel={""}
          />
          <PaginationButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </PaginationButton>
        </PaginationControll>
      </PaginationContainer>
    </Home>
  );
}

export default Candidates