import React, { useState, useEffect } from 'react';
import TagsInput from './components/Tagsinput';
import FeaturedRecipes from './components/FeaturedRecipes';
import RecipeCardDisplay from './components/RecipeCardDisplay';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(1); // Default count set to 1
  const [tags, setTags] = useState([]); // For selected tags
  const [ingredients, setIngredients] = useState([]);
  const [aiTags, setAiTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [completeRotation, setCompleteRotation] = useState(false);
  
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
    const intValue = parseInt(e.target.value, 10); // Convert to integer using base 10
    setCount(intValue); // Update the state with the integer value
  };

  const getRecipes = async () => {
    // Assuming POST request to send count and tags as part of the request body\
    if(loading){
      return;
    }else{
      setLoading(true);
      setCompleteRotation(false);
    }

    try {
      const response = await fetch('/RR/get_recipes', { // Updated endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags, count }), // Send count and tags in the request body
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText} test`);
      }
      const data = await response.json();
      setData(data);
      
      setRecipes(data);

      // Ensure spinner completes one full rotation
      setTimeout(() => {
        setLoading(false);
        setCompleteRotation(true);
        setShowModal(true);
      }, 2000); // Set timeout to match the spinner's animation duration

    } catch (error) {
      console.error('Failed to fetch data:', error);
      setTimeout(() => {
        setLoading(false);
        setCompleteRotation(true);
      }, 1000);
    }

    //setRecipes(recipesTest);
    //setShowModal(true);
  };

  const getAiRecipes = async () => {
    // Assuming POST request to send count and tags as part of the request body
    if(loading){
      return;
    }else{
      setLoading(true);
      setCompleteRotation(false);
    }

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
      setRecipes(data);
      setShowModal(true);

    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
      setCompleteRotation(true);
    }

    setLoading(false);
    setCompleteRotation(true);
  };

  const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
};


  // Function to fetch featured recipes
  const getFeaturedRecipes = async () => {
    // Check for cached data first
    const cachedRecipes = getWithExpiry('featuredRecipes');
    if (cachedRecipes) {
        setFeaturedRecipes(cachedRecipes);
        return;
    }

    try {
      const response = await fetch('/RR/get_featured_recipes'); // Call your endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFeaturedRecipes(data); // Update your state with the fetched recipes

      // Cache the data with a 1 week expiry (1 week = 604800000 milliseconds)
      setWithExpiry('featuredRecipes', data, 604800000);
    } catch (error) {
      console.error("Failed to fetch featured recipes:", error);
    }
  };

  // useEffect hook to fetch featured recipes when the component mounts
  useEffect(() => {
    getFeaturedRecipes();
  }, []); // The empty array ensures this effect runs only once after initial render

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
          <img src='/SpinnerBackground2.png' className="spinner-background"></img>
          <img src='/Spinner4.png' className={`spinner ${loading && !completeRotation ? 'spinning' : ''}`}></img>
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
      <FeaturedRecipes recipes={featuredRecipes}></FeaturedRecipes>
      {showModal && (
        <RecipeCardDisplay recipes={recipes} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default App;
