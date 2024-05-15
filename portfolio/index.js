document.addEventListener('DOMContentLoaded', () => {
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

    /* contact form display change */
    const form = document.getElementById('contact-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.style.display = 'none';
        thankYouMessage.style.display = 'block';
    });

});
    
