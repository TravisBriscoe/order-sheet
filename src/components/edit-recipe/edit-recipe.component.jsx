import React from 'react';

import { withRouter } from 'react-router-dom';

import './edit-recipe.styles.scss'

class EditRecipe extends React.Component {
  constructor(props) {
    super(props)

    this.onHandleInputChange = this.onHandleInputChange.bind(this);
    this.onClearFields = this.onClearFields.bind(this);

    this.state = {
      recipeEdit: {
        id: '',
        recipe: {
          ingredients: [],
          notes: ''
        }
      },
    }
  }

  onHandleInputChange(event) {
    const { name, value } = event.target;

    // Check to see if the input name is for the notes field
    if (name === 'notes') {
      this.setState((prevState) => {
        return {
          recipeEdit: {
            ...prevState.recipeEdit,
            recipe: {
              ...prevState.recipeEdit.recipe,
              notes: value,
            }
          }
        }
      })
      // Check if input name is for the recipe name field
    } else if (name === 'name') {
      // Capitlize first letter (only of sentance, not of every word)
      const capitalizeFirstLetter = (s) => {
        return s && s[0].toUpperCase() + s.slice(1);
      }
      const newName = capitalizeFirstLetter(value);
      // Create a new url link entry without spaces and in lowercase
      const newLinkUrl = value.replace(/\s+/g, '').toLowerCase();

      // Save it to state.
      this.setState((prevState) => {
        return {
          recipeEdit: {
            ...prevState.recipeEdit,
            name: newName,
            linkUrl: newLinkUrl,
          }
        }
      })
    } else {
      // Handle any other input (there isn't any other inputs)
      this.setState((prevState) => {
        return {
          recipeEdit: {
            ...prevState.recipeEdit,
            [name]: value
          }
        }
      })
    }
  }

  onHandleIngreds(event, index) {
    const { value } = event.target;
    const ingreds = [...this.state.recipeEdit.recipe.ingredients]

    // Set a new ingreds array index to the input value
    ingreds[index] = value;

    // Set the state for the new ingredient being added, spread previous state so previous saves are not lost
    this.setState((prevState) => {
      return ({
        recipeEdit: {
          ...prevState.recipeEdit,
          recipe: {
            ...prevState.recipeEdit.recipe,
            ingredients: ingreds
          }
        }
      })
    })
  }

  onDeleteRecipe(event, data) {
    event.preventDefault();

    // Delete just the opened recipe
    this.props.onDeleteEntry('recipes', data);
    // Redirect to the manage recipe page with no recipe rendered
    this.props.history.push('/manage/edit-recipes');
  }

  onClearFields(event) {
    event.preventDefault();

    // Clear the entire form
    this.recipeForm.current.reset();
  }

  onSave(event, link) {
    event.preventDefault();

    // Set recipeEdit state before passing into firebase update function
    this.setState((prevState, props) => {
      const { id } = props.recipes[link];
      const oldIngreds = props.recipes[link].recipe.ingredients;
      const newIngreds = this.state.recipeEdit.recipe.ingredients;
      let name, linkUrl;
  
      // Check to see if the recipe NAME has been changed
      if (!prevState.recipeEdit.name) {
        // If not changed, use recipe name and linkUrl from recipes State
        name = props.recipes[link].name;
        linkUrl = props.recipes[link].linkUrl;
      }

      // Set the state with all relevant data
      return {
        recipeEdit: {
          ...prevState.recipeEdit,
          id,
          name,
          linkUrl,
          recipe: {
            ...prevState.recipeEdit.recipe,
            ingredients: [...oldIngreds, ...newIngreds],
          }
        }
      }
    }, () => {
      // Send data to firebase and re-intialize recipes State app-wide
      this.props.onSaveRecipe(this.state.recipeEdit);

      // Reset form
      this.recipeForm.current.reset();

      // Clear recipeEdit State and redirect to the new url
      this.setState({ recipeEdit: {
        id: '',
        recipe: {
          ingredients: [],
          notes: ''
        }
      }}, () => this.props.history.push(`/manage/edit-recipes/${this.props.recipes[link].linkUrl}`));
      
    })
  }


  render() {
    // Pull recipeId from url
    const { recipeId } = this.props.match.params;

    // Pull dynamic recipe from clicked link
    const recipes = this.props.recipes[recipeId];

    // Pull recipeEdit object from State
    const { recipeEdit } = this.state;

    // Pull ingredients array from recipeEdit object
    const { recipe: { ingredients } } = recipeEdit;
    
    return (
      <div className='manage-recipes-content-recipe'>
        <form className='manage-recipes-content-recipe-form' ref={this.recipeForm} onSubmit={(event) => this.onSave(event, recipeId)}>
          <input name='name' type='text' className='manage-recipes-content-recipe-form--title' placeholder={recipes.name} value={recipeEdit.name ? recipeEdit.name : ''} onChange={this.onHandleInputChange} />
          <div className='manage-recipes-content-recipe-form--ingreds'>
            <h3>Ingredients:</h3>
            <div> 
              {
                recipes.recipe.ingredients.map((x, index) => (<input key={index} name={index} placeholder={x} value={x} onChange={(event) => this.onHandleIngreds(event, index)} />))
              }
            </div>
            {
              ingredients.map((x, index) => (<input key={index} name={index} placeholder={x} value={this.state.recipeEdit.recipe.ingredients[index] || x} onChange={(event) => this.onHandleIngreds(event, index)} />))
            }
            <button onClick={(event) => {
              event.preventDefault();
              
              const oldIngreds = this.state.recipeEdit.recipe.ingredients;
          
              oldIngreds.push('')

              this.setState((prevState) => {
                return {
                  recipeEdit: {
                    ...prevState.recipeEdit,
                    recipe: {
                      ...prevState.recipeEdit.recipe,
                      ingredients: oldIngreds
                    }
                  }
                }
              })
            }}>Add new field</button>
          </div>
          <div className='manage-recipes-content-recipe-form--notes'>
            <h3>Instructions:</h3>
            <textarea name='notes' placeholder={recipes.notes} style={{color: 'red'}} wrap="soft" value={recipeEdit.recipe.notes ? recipeEdit.recipe.notes : recipes.notes} onChange={this.onHandleInputChange} />
          </div>
          <div className='manage-recipes-content-recipe-form-actions'>
            <input type='submit' className='manage-recipes-content-recipe-form-actions--update_btn' value='Update Entry' />
            <button className='manage-recipes-content-recipe-form-actions--delete_btn' onClick={(event) => this.onDeleteRecipe(event, recipes)}>Delete Recipe</button>
            <button className='manage-recipes-content-recipe-form-actions--cancel_btn' onClick={this.onClearFields}>Clear Fields</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditRecipe);