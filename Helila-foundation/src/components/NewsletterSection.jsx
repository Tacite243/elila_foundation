import React from 'react';
import './App.css';

export default function NewsletterSection (){
  return (
    <section className="newsletter-section">
      <div className="container">
        <h2>Subscribe to our Newsletter</h2>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
};
