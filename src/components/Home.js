import React, {useEffect} from 'react'

const Home = () => {
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
      <>
      <section id="home" className="section">
        <h1>Julia Martin</h1>
        <a href="#about" className="arrow">About Me <span className="arrow-icon">v</span></a>
      </section>
      <section id="about" className="section">
            <h2>About Me</h2>
            <p>Fun facts and hobbies.</p>
      </section>
      </>
    );
};
  
export default Home