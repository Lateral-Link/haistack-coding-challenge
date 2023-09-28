import React from "react";
import { Route, Switch } from "react-router-dom";
import Candidates from "./Candidates/Candidates";
import Candidate from "./Candidate/Candidate";
import CandidateForm from "./Candidate/CandidateForm";
import GlobalFont from "../components/Common/GlobalFont";

const App = () => {
  return (
    <>
      <GlobalFont />
      <Switch>
        <Route exact path="/" component={Candidates} />
        <Route exact path="/candidates/:id" component={Candidate} />
        <Route exact path="/candidates/:id/update" component={CandidateForm} />
        <Route exact path="/candidate/new" component={CandidateForm} />
      </Switch>
    </>
  );
};

export default App;
