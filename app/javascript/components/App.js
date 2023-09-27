import React from "react";
import {Route, Switch} from "react-router-dom";
import Candidates from './Candidates/Candidates'
import Candidate from './Candidate/Candidate'

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Candidates}/>
      <Route exact path='/candidates/:id' component={Candidate}/>
    </Switch>
  )
}

export default App;