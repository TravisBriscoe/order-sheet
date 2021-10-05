import { FETCH_RECIPES } from './recipes.types';

import { recipeData } from '../../firebase/firebase.utils';

export const fetchRecipes = () => async dispatch => {
  const recipeDataObj = await recipeData();

  return dispatch ({ 
    type: FETCH_RECIPES,
    payload: recipeDataObj
  })
}

export default fetchRecipes;