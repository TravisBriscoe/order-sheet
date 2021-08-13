import React from 'react';
import { Switch, Route } from 'react-router-dom'

import RecipeNav from '../../components/recipe-nav/recipe-nav.component';
import RecipeContent from '../../components/recipe-content/recipe-content.component';

import RECIPE_DATA from '../../data/recipe.list';

import './recipes.styles.scss';

const RecipesPage = () => {
  const { ...otherRecipeProps } = RECIPE_DATA;

  return (
  <div className='recipe'>
    <Switch>
      <Route path='/recipes/:recipeId'>
        <RecipeContent {...otherRecipeProps} />
      </Route>
    </Switch>
    <RecipeNav />
  </div>
)};

export default RecipesPage;