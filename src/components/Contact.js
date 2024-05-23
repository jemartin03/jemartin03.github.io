import React, {useEffect} from 'react';
import '../index.css';
import emailjs from '@emailjs/browser';
import Banner from "./Banner";

const Contact = () => {

    useEffect(() => {
        emailjs.init("sUSyhtm9NkgfXFWh2");
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


    }, [])

    const onFormSubmit = (e) => {
        /* contact form display change */
        const form = document.getElementById('contact-form');
        const thankYouMessage = document.getElementById('thank-you-message');

        console.log("FLAG1!")
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Send email using EmailJS
        emailjs.send('default_service', 'template_bgi6azf', formData)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                // Show thank you message
                thankYouMessage.style.display = 'block';
                // Hide the form
                form.style.display = 'none';
            }, (error) => {
                console.log('FAILED...', error);
                alert('Failed to send the email. Please try again later.');
            });
    }
    return (
        <main>
            <section id="contact" className="section">
                <Banner page="contact" />
                <div className="container">
                    <form id="contact-form" className="contact-form" onSubmit={onFormSubmit}>
                        <p>Please fill out your information below:</p>
                        <input type="text" id="name" name="name" placeholder="Your Name" required/>
                        <input type="email" id="email" name="email" placeholder="Your Email" required/>
                        <textarea id="message" name="message" placeholder="Your Message" required></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    <div id="thank-you-message" className="thank-you-message" style={{"display":"none"}}>
                        Thanks for reaching out! I'll get back to you soon :)
                    </div>
                    <div className="links-container">
                        <a className="link" href="https://github.com/jemartin03" target="_blank" style={{"display":"block"}}>
                        <img className="logo" src="images/icons8-github-90.png" alt="GitHub Logo"/>
                        <p>Github</p>
                        </a>
                        <a className="link" href="https://www.linkedin.com/in/jemartin03" target="_blank" style={{"display":"block"}}>
                        <img className="logo" src="images/icons8-linkedin-100.png" alt="Linkedin Logo"/>
                        <p>Linkedin</p>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;