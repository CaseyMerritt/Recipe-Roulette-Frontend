import React, { useState } from 'react';
import './RecipeCardDisplay.css';

function RecipeCardDisplay({ recipes, onClose }) {
    const placeholderImage = 'https://via.placeholder.com/150';
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [showEmailInput, setShowEmailInput] = useState(false);  // State to manage email input visibility
    const [email, setEmail] = useState(''); // State to store the email input

    const toggleRecipeSelection = (recipe) => {
        const isSelected = selectedRecipes.includes(recipe);
        setSelectedRecipes(isSelected ? selectedRecipes.filter(r => r !== recipe) : [...selectedRecipes, recipe]);
    };

    const handleShareButtonClick = () => {
        setShowEmailInput(true);  // Show email input when share button is clicked
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value); // Update the email state as the user types
    };

    const handleSubmitEmail = async () => {
        const payload = {
            email: email,
            recipes: selectedRecipes
        };

        try {
            const response = await fetch('/RR/send_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                console.log("Email and recipes sent successfully!");
                setShowEmailInput(false); // Optionally hide the input after successful submission
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const normalizedRecipes = Array.isArray(recipes) ? recipes : [recipes];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className='modal-button-container'>
                    <button className="modal-close-button" onClick={onClose}>&times;</button>
                </div>
                {normalizedRecipes.map((recipe, index) => (
                    <div key={index} className="recipe-card-modal">
                        <div className='select-button-container'>
                            <button className="select-button-modal" onClick={() => toggleRecipeSelection(recipe)}>
                                {selectedRecipes.includes(recipe) ? '✓' : ''}
                            </button>
                        </div>
                        <img src={recipe.image || placeholderImage} alt={recipe.title} className="recipe-image-modal" />
                        <div className="recipe-title-modal">{recipe.title}</div>
                        <p className='recipe-description-modal'>{recipe.description}</p>
                        <button className="recipe-view-more-modal">View More</button>
                    </div>
                ))}
                {!showEmailInput && <button className="share-button-modal" onClick={handleShareButtonClick}>Get Grocery List</button>}
                {showEmailInput && (
                    <div className="email-input-container">
                        <input type="email" placeholder="Enter your email" className="email-input-modal" value={email} onChange={handleEmailChange}/>
                        <button className="submit-email-button" onClick={handleSubmitEmail}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeCardDisplay;
