"use client"
import React, { useState } from 'react';
import LoginPopup from './loginPopup';

const Footer = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <footer id="footer" className="footer dark-background">
      <div className="container">
        <div className="row gy-3">
          {/* Address Section */}
          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-geo-alt icon"></i>
            <div className="address">
              <h4>Adresse</h4>
              <p>Goma</p>
              <p>A108 Katoy, 23</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-telephone icon"></i>
            <div>
              <h4>Contact</h4>
              <p>
                <strong>Téléphone:</strong><span> +123 456 7890</span><br />
                <strong>Email:</strong><span> info@example.com</span>
              </p>
            </div>
          </div>

          {/* Opening Hours Section */}
          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-clock icon"></i>
            <div>
              <h4>Houres de services</h4>
              <p>
                <strong>Lundi - Samedi : </strong> <span>08h00 - 17h00</span><br />
                <strong>Dimanche : </strong> <span>fermé</span>
              </p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="col-lg-3 col-md-6">
            <h4>Nos réseaux sociaux</h4>
            <div className="social-links d-flex">
              <a href="#" className="twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1 sitename"><button onClick={() => setShowLogin(true)}>Elila foundation</button></strong> <span>All Rights Reserved</span></p>
        {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
        <div className="credits">
          Designed by Professor
        </div>
      </div>
    </footer>
  );
};

export default Footer;