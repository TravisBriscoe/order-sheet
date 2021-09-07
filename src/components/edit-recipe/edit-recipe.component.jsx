import React from 'react';

import { withRouter } from 'react-router-dom';

// import { deleteEntry, updateEntry, addNewEntry } from '../../firebase/firebase.utils';

import './edit-recipe.styles.scss'

class EditRecipe extends React.Component {
  constructor(props) {
    super(props)

    this.onHandleInputChange = this.onHandleInputChange.bind(this);

    this.state = {
      recipeEdit: {
        recipe: {
          ingredients: {},
          notes: ''
        }
      },
    }
  }

  onHandleInputChange(event) {
    const { name, value } = event.target;
    let id;

    console.log(name)
    // Checks if user inputs an ID already in use and alerts user if true.
    if (name === 'id') {
      const compare = Object.entries(this.props.recipes).filter(recipe => {
        return recipe[1].id === value;
      })
      if (!compare) {
        id = value;
        console.log(id)
      }
    } else if (typeof(name) === Number ) {
      // Checks that the name of the input is a number, in which case it's (probably) an ingredient listing.
      this.setState({ recipeEdit: {
        recipe: {
          ingredients: [
            value,
          ]
        }
      }}, () => console.log(this.state.recipeEdit))
    } else if (name === 'notes') {
      this.setState({ recipeEdit: { recipe: { notes: value }}}, console.log(this.state.recipeEdit))
    } else {
      // Sets the rest of state (recipeEdit) to [name: value]
      this.setState({ recipeEdit: { [name]: value }}, () => console.log(this.state.recipeEdit));
    }
  }


  render() {
    
    const { recipeId } = this.props.match.params;
    const recipes = this.props.recipes[recipeId];
    const { recipeEdit } = this.state;
    console.log(recipes)
    console.log(recipeEdit);
    
    return (
      <div className='manage-recipes-content-recipe'>
        <div className='manage-recipes-content-recipe--newrecipe'>
          <button>Create New Recipe</button>
        </div>
        <form className='manage-recipes-content-recipe-form'>
          <input name='name' type='text' className='manage-recipes-content-recipe-form--title' placeholder={recipes.name} value={recipeEdit.name ? recipeEdit.name : ''} onChange={this.onHandleInputChange} />
          <div className='manage-recipes-content-recipe-form--ingreds'>
            <h3>Ingredients:</h3>
            <div>{recipes.recipe.ingredients.map((x, index) => (<input key={index} name={index} placeholder={x} value={x} readOnly />))}</div>
            <button>Add new field</button>
          </div>
          <div className='manage-recipes-content-recipe-form--notes'>
            <h3>Instructions:</h3>
            <textarea name='notes' placeholder={recipes.notes} style={{color: 'red'}} wrap="soft" value={recipeEdit.recipe ? recipeEdit.recipe.notes : ''} onChange={this.onHandleInputChange} />
            <h3>Recipe ID:</h3>
            <input type='text' name='id' placeholder={recipes.id} value={recipeEdit.id ? recipeEdit.id : ''} onInput={this.onHandleInputChange} />
          </div>
          <div className='manage-recipes-content-recipe-form--actions'>
            <input type='submit' className='manage-recipes-content-recipe-form--update_btn' value='Update Entry' />
            <button className='manage-recipes-content-recipe-form--delete_btn'>Delete Recipe</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditRecipe);