import React from 'react';

import { useParams } from 'react-router-dom';

import './recipe-content.styles.scss';

const RecipeContent = (...otherRecipeProps) => {
  const { recipeId } = useParams();
  const recipeData = {...otherRecipeProps[0][recipeId]};

  const { name, recipe: {ingredients, notes} = {} } = recipeData;
  // const { ingredients, notes } = recipe;

  return (
  <div className='recipe-content'>
    <h2 className='recipe-content-title'>{name}</h2>
    <div className='recipe-content-ingredients'>
      {
        ingredients ?
          ingredients.map(ingredient => {
            return (<p>{ingredient}</p>)
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