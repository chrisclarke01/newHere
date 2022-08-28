import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import logo from './logo.png';
import Navbar from './components/Navbar';
import About from './pages/about';
import Signup from './pages/signup';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/about' element = { <About/> } />
          <Route path='/signup' element = { <Signup/> } />
        </Routes>
      </Router>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          newHere
        </p>
      </header>
    </div>
  );
}

export default App;
