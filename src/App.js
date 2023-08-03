import React, { useState } from 'react';
import './App.css';
import axios from 'axios'; 


import logo from './logo.svg';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/register', {
        username,
        email,
        password,
      });

      console.log(response.data);
      // Handle successful registration, e.g., display a success message or redirect to a login page.
    } catch (error) {
      console.error(error.response.data);
      // Handle registration error, e.g., display an error message.
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        {/* Your React app content */}
      </header>

      {/* User Registration Form */}
      <form onSubmit={handleRegistration}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
