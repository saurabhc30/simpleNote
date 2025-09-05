import React, {useState} from 'react';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import LandingPage from './landingPage'
import NotesPage from './NotePage';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter >
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/notes" element={<NotesPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
