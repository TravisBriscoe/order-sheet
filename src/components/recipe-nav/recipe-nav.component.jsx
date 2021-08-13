import React from 'react';
import { Link } from 'react-router-dom';

import RECIPE_DATA from '../../data/recipe.list';

import './recipe-nav.styles.scss';

const RecipeNav = () => {
  return (
    <nav className='recipe-nav'>
      {
        Object.keys(RECIPE_DATA).map((keyName, keyIndex) => (<Link key={keyIndex} to={`/recipes/${RECIPE_DATA[keyName].linkUrl}`}>{RECIPE_DATA[keyName].name}</Link>))
      }
    </nav>
  )
};

export default RecipeNav;