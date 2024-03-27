import './FeaturedRecipes.css';

function FeaturedRecipes({ recipes }) {
    return (
      <div className="featured-recipes">
        <div className="recipes-container">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} className="recipe-image"/>
                <div className='recipe-content'>
                    <div className="recipe-title">{recipe.title}</div>
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