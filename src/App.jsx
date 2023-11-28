import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Components
import Sidebar from './components/Sidebar';

//Pages
import Login from './pages/Login/Login';
import QuoterRegister from './pages/Quoters/QuoterRegister';
import Quoters from './pages/Quoters/Quoters';
import IssuePolicy from './pages/IssuePolicy/IssuePolicy';
import ToEmmitPolicy from './pages/IssuePolicy/ToEmmitPolicy';
import ToEmmitPolicyRegister from './pages/IssuePolicy/ToEmmitPolicyRegister';
import ValidityPolicy from './pages/IssuePolicy/ValidityPolicy';
import Users from './pages/Users/Users';
import NewUser from './pages/Users/NewUser';
import ValidationComponent from './components/ValidationComponent';

function App() {

  let url = window.location.href
  
  return (
    <Router>
      { !url.includes("/login") && <Sidebar/> }
      <Routes>
        <Route path="/login" exact element={<Login/>}/>
        {/* <Route path="/quotes" exact element={<Quoters/>}/>
        <Route path="/quoter-register" exact element={<QuoterRegister/>}/> */}
          <Route path="/" exact element={ <ValidationComponent><Quoters/></ValidationComponent>}/>
          <Route path="/quoter-register" exact element={ <ValidationComponent><QuoterRegister/> </ValidationComponent>}/>
          <Route path="/issue-policy" exact element={ <ValidationComponent><IssuePolicy/> </ValidationComponent>}/>
          <Route path="/to-emmit-policy" exact element={ <ValidationComponent><ToEmmitPolicy/> </ValidationComponent>}/>
          <Route path="/to-emmit-policy-register" exact element={ <ValidationComponent><ToEmmitPolicyRegister/></ValidationComponent>}/>
          <Route path="/validity-policy" exact element={ <ValidationComponent><ValidityPolicy/> </ValidationComponent>}/>
          <Route path="/users" exact element={ <ValidationComponent><Users/> </ValidationComponent>}/>
          <Route path="/new-user" exact element={ <ValidationComponent><NewUser/> </ValidationComponent>}/>
      </Routes>
    </Router>
  )
}

export default App
