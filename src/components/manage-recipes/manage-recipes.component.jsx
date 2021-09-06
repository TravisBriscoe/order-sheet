import React from 'react';

import { Switch, Route } from 'react-router';

// import { Link } from 'react-router-dom';

import RecipeNav from '../recipe-nav/recipe-nav.component';
import EditRecipe from '../edit-recipe/edit-recipe.component';

import './manage-recipes.styles.scss';

const ManageRecipes = (props) => {

  const { recipes } = props;
  console.log(recipes)

  return (
    <div>
      { 
        recipes ?
          (<div className='manage-recipes'>
            <div className='manage-recipes-navi'>
              <RecipeNav recipes={recipes} />
            </div>
            <div className='manage-recipes-content'>
              <Switch>
                <Route path='/manage/edit-recipes/:recipeId'>
                  <EditRecipe recipes={props.recipes}/>
                </Route>
              </Switch>
            </div>
          </div>)
          : (<div className='manage-recipes'><button className='manage-recipes--newrecipe'>Add New Recipe</button></div>)
      }
    </div>
  );
}

export default ManageRecipes;