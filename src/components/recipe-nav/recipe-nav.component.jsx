import React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import './recipe-nav.styles.scss';

const RecipeNav = ({ recipes }) => {
  const { path } = useRouteMatch();

  return (
    <nav className='recipe-nav'>
      {
        Object.keys(recipes).map((keyName, keyIndex) => (<Link key={keyIndex} to={`${path}/${recipes[keyName].linkUrl}`}>{recipes[keyName].name}</Link>))
      }
    </nav>
  )
};

export default RecipeNav;