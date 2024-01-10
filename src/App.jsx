import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

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
import Home from './pages/Home/Home';

function App() {

  let url = window.location.href
  
  return (
    <Router>
      { !url.includes("/login") && <Sidebar/> }
      { !url.includes("/login") && <Navbar/> }
      <Routes>
        <Route path="/login" exact element={<Login/>}/>
          <Route path="/" exact element={ <Home/> }/>
          <Route path="/quotes" exact element={ <ValidationComponent nameLink="VerConfiguracionDanoDT"><Quoters/></ValidationComponent> }/>
          <Route path="/quoter-register" exact element={ <ValidationComponent nameLink="VerConfiguracionDanoDT" ><QuoterRegister/> </ValidationComponent>}/>
          <Route path="/issue-policy" exact element={ <ValidationComponent nameLink="VerEmisionPoliza" ><IssuePolicy/> </ValidationComponent>}/>
          <Route path="/to-emmit-policy" exact element={ <ValidationComponent nameLink="VerEmisionPoliza" ><ToEmmitPolicy/> </ValidationComponent>}/>
          <Route path="/to-emmit-policy-register" exact element={ <ValidationComponent nameLink="VerEmisionPoliza" ><ToEmmitPolicyRegister/></ValidationComponent>}/>
          <Route path="/validity-policy" exact element={ <ValidationComponent nameLink="VerEmisionPoliza" ><ValidityPolicy/> </ValidationComponent>}/>
          <Route path="/users" exact element={ <ValidationComponent nameLink="VerConfiguracionDanoDT" ><Users/> </ValidationComponent>}/>
          <Route path="/new-user" exact element={ <ValidationComponent nameLink="VerConfiguracionDanoDT" ><NewUser/> </ValidationComponent>}/>
      </Routes>
    </Router>
  )
}

export default App
