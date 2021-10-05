/**
 * Manage Recipe's page
 * Allows users to see list of saved recipes, edit them or add new entries.
 * Saves edited entries to propogated states and functions.
 * Class Component
 * Imported Components: RecipeName, EditRecipe, AddRecipe
 * State: onNewRecipe: boolean
 * Props: recipes, onSaveRecipe(), onDeleteEntry()
 * functions: onCreateRecipe()
*/

import React from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';

import RecipeNav from '../recipe-nav/recipe-nav.component';
import EditRecipe from '../edit-recipe/edit-recipe.component';
import AddRecipe from '../add-recipe/add-recipe.component';

import withLoading from '../../withLoading';

import './manage-recipes.styles.scss';

const ManageRecipes = (props) => {
  const { recipes, isLoading, onCreateRecipe, onDeleteEntry, onSaveRecipe, onNewRecipe } = props;

  return (
    <div className='manage-recipes'>
      { 
        recipes
          ? <div className='manage-recipes-main'>
              <div className='manage-recipes-main-navi'>
                <RecipeNav recipes={recipes} isLoading={isLoading} onCreateRecipe={onCreateRecipe} />
              </div>
              <div className='manage-recipes-main-content'>
                {
                  !onNewRecipe
                    ? <button className='manage-recipes-main-content--newrecipe' onClick={onCreateRecipe}>Add New Recipe</button>
                    : <button className='manage-recipes-main-content--newrecipe' disabled onClick={onCreateRecipe}>Add New Recipe</button>
                }
                {
                  !onNewRecipe
                    ? <Switch>
                        <Route path='/manage/edit-recipes/:recipeId'>
                          <EditRecipe
                            recipes={recipes}
                            onDeleteEntry={onDeleteEntry}
                            onNewRecipe={onNewRecipe}
                            onCreateRecipe={onCreateRecipe}
                            onSaveRecipe={onSaveRecipe}
                          />
                        </Route>
                      </Switch>
                    : <AddRecipe onNewRecipe={onNewRecipe} onCreateRecipe={onCreateRecipe} recipes={recipes} onSaveRecipe={onSaveRecipe} />
                }
              </div>
            </div>
          : <div className='manage-recipes-main'>
              <AddRecipe onCreateRecipe={onCreateRecipe} onNewRecipe={onNewRecipe} recipes={recipes} onSaveRecipe={onSaveRecipe} />
            </div>
      }
    </div>
  );
}
export default withLoading(withRouter(ManageRecipes));