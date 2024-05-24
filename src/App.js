import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from "./components/Home";
import Thoughts from "./components/Thoughts";
import Resume from "./components/Resume";
import Contact from './components/Contact';
import Spotify from "./components/Spotify";
import Callback from './components/Callback';
import "./index.css";

const App = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(() => {
    const path = location.pathname.slice(1);
    return path === "" ? "home" : path;
  });

  useEffect(() => {
    let path = location.pathname.slice(1);
    console.log("location", location);
    console.log("path:", path);
    let newPath = path.split('/').pop(); // Get the last segment of the path
    if (newPath === "%2Fcallback") {
      newPath = "callback";
      path = "callback";
      console.log("path:", path);

      const currentUrl = window.location.href;
      const queryParams = currentUrl.split('?')[1];
      const code = new URLSearchParams(queryParams).get('code');
      window.location.href = `https://jemartin03.github.io/#/callback?code=${code}`
    }
    setCurrentPage(newPath === "" ? "home" : newPath);
    console.log("Current Page:", newPath);
  }, [location]);

  const onClick = (clicked) => {
    console.log("Clicked Page:", clicked);
    setCurrentPage(clicked);
  };

  return (
    <>
      <header id="header">
        <nav>
          <ul>
            <li><Link className='nav-link' to="/" onClick={() => onClick("home")}>Home</Link></li>
            <li><Link className='nav-link' to="/thoughts" onClick={() => onClick("thoughts")}>My Thoughts</Link></li>
            <li><Link className='nav-link' to="/resume" onClick={() => onClick("resume")}>Resume</Link></li>
            <li><Link className='nav-link' to="contact" onClick={() => onClick("contact")}>Contact</Link></li>
            <li><Link className='nav-link' to="/spotify" onClick={() => onClick("spotify")}>Spotify</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thoughts" element={<Thoughts />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/spotify" element={<Spotify />} />
        <Route path="callback" element={<Callback />} />
      </Routes>
    </>
  );
};

export default App;

