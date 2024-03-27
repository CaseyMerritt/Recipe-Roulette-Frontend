import './RecipeCardDisplay.css';

function RecipeCardDisplay({ recipes, onClose }) {
    const placeholderImage = 'https://via.placeholder.com/150'; // URL of your placeholder image

    // Normalize recipes into an array
    const normalizedRecipes = Array.isArray(recipes) ? recipes : [recipes];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className='modal-button-container'>
                    <button className="modal-close-button" onClick={onClose}>&times;</button>
                </div>
                {normalizedRecipes.map((recipe, index) => (
                    <div key={index} className="recipe-card-modal">
                        <img src={recipe.image || placeholderImage} alt={recipe.title} className="recipe-image-modal" />
                        <div className="recipe-title-modal">{recipe.title}</div>
                        <p className='recipe-description-modal'>{recipe.description}</p>
                        <button className="recipe-view-more-modal">View More</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeCardDisplay;
