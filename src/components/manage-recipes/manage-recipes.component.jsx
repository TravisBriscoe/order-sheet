import React from 'react';

import { Switch, Route } from 'react-router';

// import { Link } from 'react-router-dom';

import RecipeNav from '../recipe-nav/recipe-nav.component';
import ManageRecipe from '../manage-recipe/manage-recipe.component';

import './manage-recipes.styles.scss';

const ManageRecipes = (props) => {

  const { recipes } = props;
  console.log(recipes)

  return (
    <div className='manage-recipes'>
      { 
        recipes ?
          (<div>
            <div className='manage-recipes-navi'>
              <RecipeNav recipes={recipes} />
            </div>
            <div className='manage-recipes-content'>
              <Switch>
                <Route path='/manage/edit-recipes/:recipeId'>
                  <ManageRecipe recipes={props.recipes}/>
                </Route>
              </Switch>
            </div>
          </div>)
          : (<button className='manage-recipes--newrecipe'>Add New Recipe</button>)
      }
    </div>
  );
}

export default ManageRecipes;