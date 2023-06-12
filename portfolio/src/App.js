import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes,useLocation,useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import Landing from './Components/Landing/Landing';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import AboutMe from './Components/AboutMe/AboutMe';
import MailMe from './Components/MailMe/MailMe';
import Proyects from './Components/Proyects/Proyects';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [access,setAccess]=useState(false);
  // const location=useLocation();
  // const navigate=useNavigate();
  // navigate='/';
  return (
    <BrowserRouter>
      <div className="App">
        {access?<NavBar setAccess={setAccess}/>:null}
        <Routes>
          <Route path="/" element={<Landing setAccess={setAccess}/>} />
          <Route element={<ProtectedRoute isAllowed={access}/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/proyects" element={<Proyects />} />
            <Route path="/mailme" element={<MailMe />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

export default App;
