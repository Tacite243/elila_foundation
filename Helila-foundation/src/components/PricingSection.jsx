import React from 'react';

export default function PricingSection (){
  return (
    <section className="pricing-section">
      <div className="container">
        <h2>Our Pricing</h2>
        <p>Choose the best plan that suits your needs</p>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Basic Plan</h3>
            <p>$19.99/month</p>
          </div>
          <div className="pricing-card">
            <h3>Standard Plan</h3>
            <p>$39.99/month</p>
          </div>
          <div className="pricing-card">
            <h3>Premium Plan</h3>
            <p>$59.99/month</p>
          </div>
        </div>
      </div>
    </section>
  );
};
