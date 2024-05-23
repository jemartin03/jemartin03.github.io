import React, { useEffect, useState } from 'react';
import Banner from "./Banner";

const Thoughts = () => {
  const [thoughts, setThoughts] = useState([
    { title: 'Thought 1', summary: 'Summary of thought 1', category: 'creative', link: '#' },
    { title: 'Thought 2', summary: 'Summary of thought 2', category: 'personal', link: '#' },
    { title: 'Thought 3', summary: 'Summary of thought 3', category: 'opinion', link: '#' }
  ]);
  const [newThought, setNewThought] = useState({ title: '', summary: '', category: '', link: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const options = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleAddThought = () => {
    setThoughts([...thoughts, newThought]);
    setNewThought({ title: '', summary: '', category: '', link: '' });
    setShowModal(false);
  };

  const handleDeleteThought = (index) => {
    const updatedThoughts = thoughts.filter((_, i) => i !== index);
    setThoughts(updatedThoughts);
  };

  return (
    <section id="thoughts" className="section">
      <Banner page="thoughts" />
      <div className="thought-container">
        {thoughts.map((thought, index) => (
          <div key={index} className="thought" data-type={thought.category}>
            <div className="tag">{thought.category}</div>
            <h3>{thought.title}</h3>
            <p>{thought.summary}</p>
            <a href={thought.link}>Read More</a>
            <button onClick={() => handleDeleteThought(index)}>Delete</button>
          </div>
        ))}
        <div className="add-thought">
          <button onClick={() => setShowModal(true)}>Add Thought</button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add a New Thought</h2>
            <label>
              Title:
              <input
                type="text"
                value={newThought.title}
                onChange={(e) => setNewThought({ ...newThought, title: e.target.value })}
              />
            </label>
            <label>
              Summary:
              <textarea
                value={newThought.summary}
                onChange={(e) => setNewThought({ ...newThought, summary: e.target.value })}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={newThought.category}
                onChange={(e) => setNewThought({ ...newThought, category: e.target.value })}
              />
            </label>
            <label>
              Link:
              <input
                type="text"
                value={newThought.link}
                onChange={(e) => setNewThought({ ...newThought, link: e.target.value })}
              />
            </label>
            <button onClick={handleAddThought}>Add Thought</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Thoughts;
