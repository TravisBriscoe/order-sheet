import React from 'react';

import { withRouter } from 'react-router-dom';

// import { deleteEntry, updateEntry, addNewEntry } from '../../firebase/firebase.utils';

class ManageRecipe extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editName: '',
      editNote: '',
      editIngreds: '',
    }
  }

  // componentDidMount() {
  //   this.setState({ editName: this.props.recipes[this.props.match.params.recipeId].name }, () => console.log(this.state.editName))
  //   this.setState({ editIngreds: this.props.recipes[this.props.match.params.recipeId].recipe.ingredients}, () => console.log(this.state.editIngreds))
  //   this.setState({ editNotes: this.props.recipes[this.props.match.params.recipeId].recipe.notes});
  // }
  
  render() {

    const { recipeId } = this.props.match.params;
    const  recipes = this.props.recipes[recipeId];
    
    return (
      <div className='manage-recipes-content-recipe'>
        <button className='manage-recipes-content-recipe--newRecipe'>Create New Recipe</button>
        <h2 className='manage-recipes-content-recipe--title'>{recipes.name}</h2>
        <h3>Ingredients:</h3>
        <h4 className='manage-recipes-content-recipe--ingreds'>{recipes.recipe.ingredients.map((x, index) => (<input readOnly key={index} value={!recipes.recipe.ingredients[index] ? recipes.recipe.ingredients[index] : x} />))}</h4>
        <button>Add new field</button>
        <h3>Instructions:</h3>
        <input type='textarea' className='manage-recipes-content-recipe--notes' style={{color: 'red'}} readOnly value={recipes.recipe.notes} />
        <div className='manage-recipes-content-recipe--actions'>
          <button>Update Entry</button>
          <button>Delete Recipe</button>
        </div>
      </div>
    );
  }
}

export default withRouter(ManageRecipe);