import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul className="router">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="router-space">
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<div></div>}></Route>
        <Route path="/signup" element={<div></div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
