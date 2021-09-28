// Manage Recipe's page
// Class Component
// Allows users to see list of saved recipes, edit them or add new entries.
// Saves edited entries to propogated states and functions.

import React from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';

import RecipeNav from '../recipe-nav/recipe-nav.component';
import EditRecipe from '../edit-recipe/edit-recipe.component';
import AddRecipe from '../add-recipe/add-recipe.component';

import withLoading from '../../withLoading';

import './manage-recipes.styles.scss';

class ManageRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.onCreateRecipe = this.onCreateRecipe.bind(this);

    this.state = {
      onNewRecipe: false,
    }
  }

  // onCreateRecipe function that propogates state and determines whether to render the AddRecipe component
  onCreateRecipe() {
    const value = !this.state.onNewRecipe;

    this.props.history.push('/manage/edit-recipes');

    this.setState({ onNewRecipe: value });
  }

  render() {
    const { recipes } = this.props;

    return (
      <div className='manage-recipes'>
        { 
          recipes
            ? <div className='manage-recipes-main'>
                <div className='manage-recipes-main-navi'>
                  <RecipeNav recipes={recipes} isLoading={this.props.isLoading} onCreateRecipe={this.onCreateRecipe} />
                </div>
                <div className='manage-recipes-main-content'>
                  {
                    !this.state.onNewRecipe
                      ? <button className='manage-recipes-main-content--newrecipe' onClick={this.onCreateRecipe}>Add New Recipe</button>
                      : <button className='manage-recipes-main-content--newrecipe' disabled onClick={this.onCreateRecipe}>Add New Recipe</button>
                  }
                  {
                    !this.state.onNewRecipe
                      ? <Switch>
                          <Route path='/manage/edit-recipes/:recipeId'>
                            <EditRecipe
                              recipes={recipes}
                              onDeleteEntry={this.props.onDeleteEntry}
                              onNewRecipe={this.state.onNewRecipe}
                              onCreateRecipe={this.onCreateRecipe}
                              onSaveRecipe={this.props.onSaveRecipe}
                            />
                          </Route>
                        </Switch>
                      : <AddRecipe onNewRecipe={this.state.onNewRecipe} onCreateRecipe={this.onCreateRecipe} recipes={this.props.recipes} onSaveRecipe={this.props.onSaveRecipe} />
                  }
                </div>
              </div>
            : <div className='manage-recipes-main'>
                <AddRecipe onCreateRecipe={this.onCreateRecipe} onNewRecipe={this.state.onNewRecipe} recipes={recipes} onSaveRecipe={this.props.onSaveRecipe} />
              </div>
        }
      </div>
    );
  }
}

export default withLoading(withRouter(ManageRecipes));