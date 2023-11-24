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
import apiProvider from './services/apiProvider';

function App() {

  let url = window.location.href
  const [loadedCheck, setLoadedCheck] = useState(false)

  function checkIfSessionValid(){
    apiProvider.getCompanyEndPoint("").then((res)=>{
      setLoadedCheck(true)
    }).catch((e)=>{
      if(e.response["status"] === 401){
        if(!url.includes("/login")){
          window.location.href = "/login"
          setLoadedCheck(true)
        }
      }
    })
  }

  useEffect(() => {
    checkIfSessionValid()
  }, [loadedCheck])
  
  return (
    <Router>
      { !url.includes("/login") && <Sidebar/> }
      <Routes>
        <Route path="/login" exact element={<Login/>}/>
        {/* <Route path="/quotes" exact element={<Quoters/>}/>
        <Route path="/quoter-register" exact element={<QuoterRegister/>}/> */}
        <Route path="/" exact element={<Quoters/>}/>
        <Route path="/quoter-register" exact element={<QuoterRegister/>}/>
        <Route path="/issue-policy" exact element={<IssuePolicy/>}/>
        <Route path="/to-emmit-policy" exact element={<ToEmmitPolicy/>}/>
        <Route path="/to-emmit-policy-register" exact element={<ToEmmitPolicyRegister/>}/>
        <Route path="/validity-policy" exact element={<ValidityPolicy/>}/>
        <Route path="/users" exact element={<Users/>}/>
        <Route path="/new-user" exact element={<NewUser/>}/>
      </Routes>
    </Router>
  )
}

export default App
