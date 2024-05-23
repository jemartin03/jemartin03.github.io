import React, {useEffect} from 'react';
import Banner from "./Banner"

const Resume = () => {

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };
    /* text loading in visual */
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);
  
    sections.forEach(section => {
        observer.observe(section);
    }); 
  }, []);

  return (
    <section id="resume" className="section">
      <Banner page="resume" />
      <p></p>
    </section>
  );
};

export default Resume;