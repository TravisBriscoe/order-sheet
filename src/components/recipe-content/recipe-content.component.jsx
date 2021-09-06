import React from 'react';

import { useParams } from 'react-router-dom';

import './recipe-content.styles.scss';

const RecipeContent = ({ recipes }) => {
  const { recipeId } = useParams();
  const recipeData = {...recipes[recipeId]};

  // console.log(useParams())
  const { name, recipe: {ingredients, notes } = {} } = recipeData;
  
  return (
  <div className='recipe-content'>
    <h2 className='recipe-content-title'>{name}</h2>
    <div className='recipe-content-ingredients'>
      {
        ingredients ?
          ingredients.map((ingredient, index) => {
            return (<p key={index}>{ingredient}</p>)
          })
          : null
      }
    </div>
    {
      notes ? 
        (<div className='recipe-content-notes'>{notes}</div>)
        : null
    }
  </div>
)};

export default RecipeContent;