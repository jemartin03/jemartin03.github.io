import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from "./components/Home"
import Thoughts from "./components/Thoughts"
import Resume from "./components/Resume"
import Contact from './components/Contact'
import Spotify from "./components/Spotify"
import Callback from './components/Callback';
import "./index.css"

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
  
   console.log(currentPage);
  }, [])

  const onClick = (clicked) => {
    console.log(clicked)
    setCurrentPage(clicked);
  }

  return (
    <Router> 
      <header id="header">
      <nav>
        <ul>
          <li><Link className='nav-link' to="/" onClick = {() => {onClick("home")}} >Home</Link></li>
          <li><Link className='nav-link' to="/thoughts" onClick = {() => {onClick("thoughts")}}>My Thoughts</Link></li>
          <li><Link className='nav-link' to="/resume" onClick = {() => {onClick("resume")}}>Resume</Link></li>
          <li><Link className='nav-link' to="/contact" onClick = {() => {onClick("contact")}}>Contact</Link></li>
          <li><Link className='nav-link' to="/spotify" onClick = {() => {onClick("spotify")}}>Spotify</Link></li>
        </ul>
      </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thoughts" element={<Thoughts />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/spotify" element={<Spotify />} />   
        <Route path="/callback" element={<Callback />} />     
      </Routes>
    </Router>
  );
}

export default App;
