import React, { useState } from 'react';
import './App.css';
import logo from './public/logo192.png'; // Adjust the path as needed

function App() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(1); // Default count set to 1
  const [tags, setTags] = useState([]); // For selected tags

  const fetchData = async () => {
    // Assuming POST request to send count and tags as part of the request body
    try {
      const response = await fetch('/get_recipes', { // Updated endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count, tags }), // Send count and tags in the request body
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };  

  // Placeholder functions for opening modal/dialog for settings
  const openCountSettings = () => {
    // Logic to open a modal/dialog where user can set the count
    console.log('Open count settings');
  };

  const openTagSettings = () => {
    // Logic to open a modal/dialog where user can select tags
    console.log('Open tag settings');
  };

  if (data) {
    return (
      <div className="data-display">
        <h1>{data.message}</h1>
        <ul>
          {data.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className="header">
        <div className="header-section">Clear Out Your Fridge!</div>
        <div className="header-section">Login</div>
      </div>
      <div className="app-container">
        <img src={logo} alt="Logo" className="centered-logo" />
        <div className="settings-container">
          <button onClick={openCountSettings} className="settings-button">Set Count</button>
          <button onClick={fetchData} className="click-me-button">Click Me</button>
          <button onClick={openTagSettings} className="settings-button">Set Tags</button>
        </div>
      </div>
    </>
  );
}

export default App;
