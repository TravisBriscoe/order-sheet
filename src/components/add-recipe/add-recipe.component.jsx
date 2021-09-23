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

  onHandleInput(event) {
    const { name, value } = event.target;

    if (name !== 'notes') {
      this.setState((prevState) => {
        return ({
          newRecipe: {
            ...prevState.newRecipe,
            [name]: value,
          }
        })
      })
    } else {
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

  onHandleIngreds(event, index) {
    const { value } = event.target;
    const ingreds = [...this.state.newRecipe.recipe.ingredients]

    ingreds[index] = value;

    this.setState({ newRecipe: { recipe: { ingredients: ingreds} } })
  }

  onSave(event) {
    event.preventDefault();

    this.setState((prevState) => {
      return {
        newRecipe: {
          ...prevState.newRecipe,
          linkUrl: this.state.newRecipe.name.replace(/\s+/g, '').toLowerCase(),
          id: Object.entries(this.props.recipes).length + 1
        }
    }})
  }

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
                      
                      const oldIngreds = this.state.newRecipe.recipe.ingredients;
                  
                      oldIngreds.push('')
      
                      this.setState({ newRecipe: {
                        recipe: {
                          ingredients: oldIngreds
                        }
                      }})
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