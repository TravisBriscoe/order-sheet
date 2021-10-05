import React from 'react';
import { Switch, Route } from 'react-router-dom'

import RecipeNav from '../../components/recipe-nav/recipe-nav.component';
import RecipeContent from '../../components/recipe-content/recipe-content.component';
import AddRecipe from '../../components/add-recipe/add-recipe.component';

// import RECIPE_DATA from '../../data/recipe.list';

import './recipes.styles.scss';

const RecipesPage = (props) => {
  
  const { recipes } = props;

  return (
    <div>
      {
        recipes ?
          (<div className='recipe'>
            <Switch>
              <Route path='/recipes/:recipeId'>
                <RecipeContent recipes={recipes} />
              </Route>
            </Switch>
            <div className='recipe-navi'>
              <RecipeNav recipes={recipes} />
            </div>
          </div>)
        : <div className='recipe-none'>
            <div className='recipe-none-content'>
              {/* <h1>No Recipes!</h1>
              <div className='recipe-none--add-recipe_btn'>
                <button>Add Recipe</button>
              </div> */}
              <AddRecipe recipes={props.recipes} onSaveRecipe={props.onSaveRecipe} />
            </div>
          </div>
      }
    </div>
  )
};

export default RecipesPage;