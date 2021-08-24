import React from 'react';

import { Link } from 'react-router-dom';

import './manage-recipes.styles.scss';

const ManageRecipes = (props) => {

  const { recipes } = props;
  console.log(recipes);

  return (
    <div className='manage-recipes'>
      <div className='manage-recipes-nav'>
        {
          Object.keys(recipes).map((keyName, keyIndex) => (<Link key={keyIndex} to={`/manage/recipes/${recipes[keyName].linkUrl}`}>{recipes[keyName].name}</Link>))
        }
      </div>
      <div className='manage-recipes-content'>

      </div>
    </div>
  );
}

export default ManageRecipes;