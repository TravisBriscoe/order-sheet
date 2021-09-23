import React from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';

import RecipeNav from '../recipe-nav/recipe-nav.component';
import EditRecipe from '../edit-recipe/edit-recipe.component';
import AddRecipe from '../add-recipe/add-recipe.component';

import './manage-recipes.styles.scss';

class ManageRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.onCreateRecipe = this.onCreateRecipe.bind(this);

    this.state = {
      onNewRecipe: false,
    }
  }

    
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
                  <RecipeNav recipes={recipes} isLoading={this.props.isLoading} />
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
                            />
                          </Route>
                        </Switch>
                      : <AddRecipe onNewRecipe={this.props.onNewRecipe} onCreateRecipe={this.onCreateRecipe} recipes={this.props.recipes} />
                  }
                </div>
              </div>
            : <div className='manage-recipes-main'>
                <AddRecipe onCreateRecipe={this.onCreateRecipe} onNewRecipe={this.state.onNewRecipe} recipes={recipes} />
              </div>
        }
      </div>
    );
  }
}

export default withRouter(ManageRecipes);