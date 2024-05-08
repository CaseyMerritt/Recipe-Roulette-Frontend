import React, { useState } from 'react';
import './FeaturedRecipes.css';
import RecipeExpandCard from './RecipeExpandCard'; 

function FeaturedRecipes({ recipes }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleViewMore = (recipe) => {
      setSelectedRecipe(recipe);
      setShowModal(true);
  };

  const handleCloseModal = () => {
      setShowModal(false);
      setSelectedRecipe(null);
  };

  return (
      <div className="featured-recipes">
          <div className="recipes-container">
              {recipes.map((recipe, index) => (
                  <div key={index} className="recipe-card">
                      <img src={recipe.images[0]} alt={recipe.title} className="recipe-image"/>
                      <div className='recipe-content'>
                          <div className="recipe-title">{recipe.title}</div>
                          <div className="recipe-title-line"></div>
                          <div className='recipe-description'>{recipe.description}</div>
                          <button 
                              className="view-more-button" 
                              onClick={() => handleViewMore(recipe)}
                          >
                              View More
                          </button>
                      </div>
                  </div>
              ))}
          </div>
          {showModal && selectedRecipe && (
              <RecipeExpandCard 
                  recipe={selectedRecipe} 
                  onClose={handleCloseModal} 
              />
          )}
      </div>
  );
}
  
  export default FeaturedRecipes