import React from 'react';

// import { Link } from 'react-router-dom';

import RecipeNav from '../recipe-nav/recipe-nav.component';

import './manage-recipes.styles.scss';

const ManageRecipes = (props) => {

  const { recipes } = props;

  return (
    <div className='manage-recipes'>
      <div className='manage-recipes-nav'>
        <RecipeNav recipes={recipes} />
      </div>
      <div className='manage-recipes-content'>

      </div>
    </div>
  );
}

export default ManageRecipes;