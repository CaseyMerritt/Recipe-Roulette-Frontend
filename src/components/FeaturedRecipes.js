import './FeaturedRecipes.css';

function FeaturedRecipes({ recipes }) {
    return (
      <div className="featured-recipes">
        <div className="recipes-container">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
                <img src={recipe.images[0]} alt={recipe.title} className="recipe-image"/>
                <div className='recipe-content'>
                    <div className="recipe-title">{recipe.title}</div>
                    <div className="recipe-title-line"></div> {/* Horizontal line between title and description */}
                    <div className='recipe-description'>{recipe.description}</div>
                    <button className="view-more-button">View More</button>
                </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default FeaturedRecipes