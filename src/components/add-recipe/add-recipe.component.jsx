/**
 *  Add Recipe's to firebase
 * Allows user to enter new recipe's, sending them to functions and states in props, allowing users to save to firebase and update state.
 * Class Component
 * Uses: React-Router (withRouter)
 * Imported Components: none
 * State: newRecipe: { name: string, linkUrl, string, id: string, recipe: { ingredients: [], notes: string }}
 * Props:
 * Hooks: None
 * Functions: onHandleInput(), onHandleIngreds(), onSave, onCancel(), onClear()
*/

import React from 'react';

import { withRouter } from 'react-router-dom';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.onHandleInput = this.onHandleInput.bind(this);
    this.onHandleIngreds = this.onHandleIngreds.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onClear = this.onClear.bind(this);

    this.newRecForm = React.createRef();

    this.state = {
      newRecipe: {
        name: '',
        linkUrl: '',
        id: '',
        recipe: {
          ingredients: [''],
          notes: ''
        }
      },
      ingredients: '',
    }
  }

  // Handler function for saving Name and Notes inputs to state
  onHandleInput(event) {
    const { name, value } = event.target;

    // If input name IS name then save the newRecipe.name state
    if (name === 'name') {

      // Creates title case for newRecipe.name
      let titleCase;
      if (value.contains(' ')) titleCase = value.split(' ').map(word => word.charAt(0).toUpperCase() + word.subStr(1)).join(' ');
      else titleCase = value.charAt(0) + value.subStr(1);

      this.setState((prevState) => {
        return ({
          newRecipe: {
            ...prevState.newRecipe,
            name: titleCase,
          }
        })
      })
    } else if (name === 'notes') {
      // If input name IS notes then push value into the correct nesting
      this.setState((prevState) => {
        return ({
          newRecipe: {
            ...prevState.newRecipe,
            recipe: {
              ...prevState.newRecipe.recipe,
              notes: value,
            }
          }        
        })
      })
    }
  }

  // Handler function to manipulate Ingredients being added, and save to state
  onHandleIngreds(event, index) {
    const { value } = event.target;

    // Retrieves old recipe ingredient state
    const ingreds = [...this.state.newRecipe.recipe.ingredients]

    // Pushes new recipe input to old recipe ingredient state variable
    ingreds[index] = value;

    this.setState((prevState) => {
      return ({
        newRecipe: {
          ...prevState.newRecipe,
          recipe: {
            ...prevState.newRecipe.recipe,
            // Saves old Recipe variable with new pushed recipe to state.
            ingredients: ingreds
          }
        }
      })
    })
  }

  // Handler function for saving new Recipe to Firebase and state
  onSave(event) {
    event.preventDefault();

    this.setState((prevState) => {
      
      // Sets ID automatically based on total amount of IDs in firebase (if > 100 pad with one zero, if > 10 pad with two zeros, or pad with 3)
      let id;
      const recipesLength = Object.entries(this.props.recipes).length;
      if (recipesLength >= 100) id = `0${recipesLength + 1}`;
      else if (recipesLength >= 10 && recipesLength < 100) id = `00${recipesLength + 1}`;
      else id = `000${recipesLength + 1}`;

      return {
        // Set linkUrl and ID before saving
        newRecipe: {
          ...prevState.newRecipe,
          linkUrl: this.state.newRecipe.name.replace(/\s+/g, '').toLowerCase(),
          id
        }
    }}, () => {
      // Sends data to props function for saving recipe entry
      console.log(this.state.newRecipe);
      this.props.onSaveRecipe(this.state.newRecipe);
    })
  }

  // Helper function for clearing all inputs and returns state to blank skeleton
  onClear(event) {
    event.preventDefault();

    this.newRecForm.current.reset();

    this.setState({ newRecipe: {
      name: '',
      recipe: {
        ingredients: [''],
        notes: ''
      }
    }})
  }

  // Helper function for cancelling AddRecipe component, and redirects to unrendered edit recipe page
  onCancel(event) {
    event.preventDefault();

    this.props.onCreateRecipe();

    this.props.history.push('/manage/edit-recipes')
  }

  render() {

    return (
      <div className='add-recipe'>
        <form className='add-recipe-form' onSubmit={this.onSave} >
          <input name='name' className='add-recipe-form-name' placeholder='Recipe Name:' onChange={this.onHandleInput} value={this.state.newRecipe.name || ''} />
            {
              this.state.newRecipe.recipe.ingredients.map((x, i) => {
                return (
                  <div key={i} className='add-recipe-form-ingredients-container'>
                    <input name='ingredients' className='add-recipe-form-ingredients-container-ingredient' placeholder='Ingredient:' onChange={(event) => this.onHandleIngreds(event, i)} value={this.state.newRecipe.recipe.ingredients[i] || ''} />
                    <button className='add-recipe-form-ingredients-container-ingredients--add_field' onClick={(event) => {
                      event.preventDefault();
                      
                      // Create a shadow copy of any input ingredients
                      const oldIngreds = this.state.newRecipe.recipe.ingredients;
                  
                      // Push an empty entry into the array
                      oldIngreds.push('')
                      
                      // Save the new ingredients array into state so a new input field will render
                      this.setState((prevState) => {
                        return ({
                          newRecipe: {
                            ...prevState.newRecipe,
                            recipe: {
                              ...prevState.newRecipe.recipe,
                              ingredients: oldIngreds
                            }
                          }
                        })
                      })
                    }}>Add Field</button>
                  </div>
                ) 
              })
            }
          <textarea name='notes' className='add-recipe-form-notes' placeholder='Directions:' onChange={this.onHandleInput} value={this.state.newRecipe.recipe.notes || ''} />
          {
            Object.entries(this.props.recipes).length <= 0
              ? <div className='add-recipe-form-actions'>
                  <input type='submit' className='add-recipe-form-actions--save' value='Save Recipe' />
                  <button className='add-recipe-form-action--clear' onClick={this.onClear}>Clear</button>
                </div>
              : <div className='add-recipe-form-actions'>
                  <input type='submit' className='add-recipe-form-actions--save' value='Save Recipe' />
                  <button className='add-recipe-form-action--clear' onClick={this.onClear}>Clear</button>
                  <button className='add-recipe-form-action--cancel' onClick={this.onCancel}>Cancel</button>
                </div>
          }
        </form>
      </div>
    )
  }
}

export default withRouter(AddRecipe);