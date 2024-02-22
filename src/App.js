import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to fetch data from your Flask API
    const fetchData = async () => {
      try {
        const response = await fetch('/get_data');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.message}</h1>
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
