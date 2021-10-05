import { FETCH_RECIPES } from './recipes.types';

const recipeReducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_RECIPES:
      return {
        recipes: action.payload
      }
    default:
      return state;
  }
}

export default recipeReducer;