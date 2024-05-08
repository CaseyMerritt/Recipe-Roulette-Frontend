import React from 'react';
import './RecipeExpandCard.css';

function RecipeExpandCard({ recipe, onClose }) {
    const placeholderImage = 'https://via.placeholder.com/150';

    return (
        <div className="expand-modal-overlay" onClick={onClose}>
            <div className="expand-modal-content" onClick={e => e.stopPropagation()}>
                <div className='expand-modal-header'>
                    <h1 className='expand-recipe-title'>{recipe.title}</h1>
                    <button className="modal-close-button" onClick={onClose}>&times;</button>
                </div>
                <img 
                    src={(recipe.images && recipe.images.length > 0 ? recipe.images[0] : placeholderImage)} 
                    alt={recipe.title} 
                    className="expand-recipe-image-modal"
                />
                <div className="expand-recipe-details">
                    <p className='expand-recipe-description-modal'>{recipe.description}</p>
                    <div className="expand-recipe-content">
                        <div className="expand-recipe-section">
                            <h2>Instructions</h2>
                            <ol>
                                {recipe.instructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ol>
                        </div>
                        {recipe.ingredients && recipe.ingredients.length > 0 && (
                            <div className="expand-recipe-section">
                                <h2>Ingredients</h2>
                                <ul>
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {recipe.macronutrients && Object.keys(recipe.macronutrients).length > 0 && (
                            <div className="expand-recipe-section">
                                <h2>Macronutrients</h2>
                                <table>
                                    <tbody>
                                        {Object.entries(recipe.macronutrients).map(([key, value], index) => (
                                            <tr key={index}><th>{key.charAt(0).toUpperCase() + key.slice(1)}</th><td>{value}</td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeExpandCard;
