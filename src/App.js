import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, Link} from 'react-router-dom';
import Home from "./components/Home"
import Thoughts from "./components/Thoughts"
import Resume from "./components/Resume"
import Contact from './components/Contact'
import Banner from "./components/Banner"
import "./index.css"

const App = () => {
  const [currentPage, setCurrentPage] = useState("Home");

  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    
        link.addEventListener('click', () => {
            // Store the active link in localStorage
            localStorage.setItem('activeNavLink', link.getAttribute('href'));
        });
    });
    
    // Retrieve the active link from localStorage
    const activeNavLink = localStorage.getItem('activeNavLink');
    if (activeNavLink) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === activeNavLink) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        }
  }, [])

  const onClick = (clicked) => {
    console.log(clicked)
    setCurrentPage(clicked);
  }

  return (
    <Router id="header"> 
      <nav>
        <ul>
          <Link className='nav-link' to="/" onClick = {() => {onClick("home")}} >Home</Link>
          <Link className='nav-link' to="/thoughts" onClick = {() => {onClick("thoughts")}}>My Thoughts</Link>
          <Link className='nav-link' to="/resume" onClick = {() => {onClick("resume")}}>Resume</Link>
          <Link className='nav-link' to="/contact" onClick = {() => {onClick("contact")}}>Contact</Link>
        </ul>
      </nav>
      <Banner page={currentPage}/>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thoughts" element={<Thoughts />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />      
      </Routes>
    </Router>
  );
}

export default App;
