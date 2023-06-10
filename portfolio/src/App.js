import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom"
import Landing from './Components/Landing/Landing';
import NavBar from './Components/NavBar/NavBar';

function App() {
   return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Route path="/" element={<Landing />} />
      </BrowserRouter>
    </div>
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
