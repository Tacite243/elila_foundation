import React from 'react';
import logo from '../assets/logo.png';

export default function Header(){
  return (
    <header className="header">
      <img src={logo} alt="Elila Holding Logo" className="logo" />
      <nav className="navigation">
        <ul>
          <li className="lien active">Acceuil</li>
          <li className="lien">A propos</li>
          <li className="lien">Identification</li>
          <li className="lien">Actualités</li>
        </ul>
      </nav>
    </header>
  );
};