import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.js';
import './contact.css';  

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const submit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await axios.post('/api/contact', { name, email, message }).catch(() => {});
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <Navbar />

      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>Have a question or feedback? Send us a message.</p>

        <div className="contact-card">
          <form onSubmit={submit} className="contact-form">
            <label>Name</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />

            <label>Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              rows={5}
            />

            <button disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'sent' && (
              <p className="success">Message sent successfully!</p>
            )}

            {status === 'error' && (
              <p className="error">Failed to send message.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
