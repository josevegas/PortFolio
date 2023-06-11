import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes,useLocation,useNavigate } from "react-router-dom"
import Landing from './Components/Landing/Landing';
import NavBar from './Components/NavBar/NavBar';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  // const location=useLocation();
  // const navigate=useNavigate();
  // navigate='/';
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
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
