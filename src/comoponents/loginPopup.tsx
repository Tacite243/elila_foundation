'use client';

import React, { useState } from 'react';
import axios from 'axios';



const LoginPopup = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/login', { email, password });
      alert('Logged in successfully');
      onClose();
      console.log('login');
      
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default LoginPopup;
