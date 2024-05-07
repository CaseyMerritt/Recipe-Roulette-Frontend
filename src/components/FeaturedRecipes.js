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
   
//    //expanding card and having a minimize card option
//    import React, { useState } from 'react';
// import './FeaturedRecipes.css';

// function FeaturedRecipes({ recipes }) {
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const toggleExpand = (index) => {
//     if (expandedIndex === index) {
//       setExpandedIndex(null);
//     } else {
//       setExpandedIndex(index);
//     }
//   };

//   return (
//     <div className="featured-recipes">
//       <div className="recipes-container">
//         {recipes.map((recipe, index) => (
//           <div key={index} className="recipe-card">
//             <img src={recipe.image} alt={recipe.title} className="recipe-image"/>
//             <div className='recipe-content'>
//               <div className="recipe-title">{recipe.title}</div>
//               {expandedIndex === index ? (
//                 <>
//                   <div className='recipe-description'>{recipe.description}</div>
//                   {/* Display other details */}
//                   <button className="view-more-button" onClick={() => toggleExpand(index)}>Minimize</button>
//                 </>
//               ) : (
//                 <button className="view-more-button" onClick={() => toggleExpand(index)}>View More</button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FeaturedRecipes;
