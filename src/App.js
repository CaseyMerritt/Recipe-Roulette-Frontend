import React, { useState } from 'react';
import TagsInput from './components/Tagsinput';
import FeaturedRecipes from './components/FeaturedRecipes';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(1); // Default count set to 1
  const [tags, setTags] = useState([]); // For selected tags
  const [ingredients, setIngredients] = useState([]);
  const [aiTags, setAiTags] = useState([]);

  const recipes = [
    {
      title: 'Spaghetti Carbonara',
      image: 'https://via.placeholder.com/150?text=Spaghetti+Carbonara',
      description: 'Test'
    },
    {
      title: 'Classic Ratatouille',
      image: 'https://via.placeholder.com/150?text=Classic+Ratatouille',
      description: 'Test'
    },
    {
      title: 'Chicken Tikka Masala',
      image: 'https://via.placeholder.com/150?text=Chicken+Tikka+Masala',
      description: 'Test'
    },
    {
      title: 'Beef Wellington',
      image: 'https://via.placeholder.com/150?text=Beef+Wellington',
      description: 'Test'
    }
  ];
  

  const updateTags = (newTags) => {
    setTags(newTags); // Update the tags state in App
  };

  const updateIngredients = (newIngredients) => {
    setIngredients(newIngredients);
  };

  const updateAiTags = (newAiTags) => {
    setAiTags(newAiTags);
  };

  const handleSliderChange = (e) => {
    setCount(e.target.value); // Update the slider value state
  };

  const getRecipes = async () => {
    // Assuming POST request to send count and tags as part of the request body
    try {
      const response = await fetch('/RR/get_recipes', { // Updated endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count, tags }), // Send count and tags in the request body
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText} test`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const getAiRecipes = async () => {
    // Assuming POST request to send count and tags as part of the request body
    try {
      const response = await fetch('/RR/get_ai_recipe', { // Updated endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients, aiTags }), // Send count and tags in the request body
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText} test`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  if (data) {
    console.log(data);
  }

  return (
    <div className="app-layout">
      <div className="navbar">
        <div className="navbar-section">
          <button className="login-button">Login</button>
        </div>
      </div>
      <div className="app-content">
        <div className="left-section">
          <div className='border-box'>
            <div className="header-section">Plan Your Week!</div>
            <div className='slider-container'>
              <div className='range'>
                <div className='slider-value'>
                  <span>{count}</span>
                </div>
                <div className='field'>
                  <div className='value-left'>1</div>
                  <input type='range' min={1} max={14} value={count} step={1} onChange={handleSliderChange}></input>
                  <div className='value-right'>14</div>
                </div>
              </div>
            </div>
            <div>
              <TagsInput setAppTags={updateTags} placeholderText="Add a tag"></TagsInput>
            </div>
            <div className="button-container">
              <button onClick={getRecipes} className="click-me-button">Submit</button>
            </div>
          </div>
        </div>
        <div className="centered-logo-container">
          <img src={'/RecipeRouletteLogo.png'} alt="Logo" className="centered-logo" />
        </div>
        <div className="right-section">
          <div className='border-box'>
            <div className="header-section">Clear Out Your Fridge!</div>
            <div>
              <TagsInput setAppTags={updateIngredients} placeholderText="Add an ingredient"></TagsInput>
            </div>
            <div>
              <TagsInput setAppTags={updateAiTags} placeholderText="Add a tag"></TagsInput>
            </div>
            <div className="button-container">
              <button onClick={getAiRecipes} className="click-me-button">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <FeaturedRecipes recipes={recipes}></FeaturedRecipes>
    </div>
  );


}

export default App;
