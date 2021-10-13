import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { addNewEntry, deleteCollection, deleteEntry, recipeData, updateEntry } from '../firebase/firebase.utils';

const getRecipes = async () => {
  const recipeDataObj = await recipeData();

  const recipeDataArr = Object.entries(recipeDataObj).map(x => x[1]);

  return recipeDataArr;
}

const fetchRecipesData = createAsyncThunk('recipesData/fetchRecipes',
  async () => {
    return getRecipes();
  }
);

const addRecipe = createAsyncThunk('recipesData/addRecipe',
  async (data) => {
    await addNewEntry('recipes', data);

    return getRecipes();
  }
);

const editRecipe = createAsyncThunk('recipesData/editRecipe',
  async (data) => {
    await updateEntry('recipes', data);

    return getRecipes();
  }
);

const deleteRecipe = createAsyncThunk('recipesData/deleteRecipe',
  async (data) => {
    await deleteEntry('recipes', data);

    return getRecipes();
  }
);

const deleteAllRecipes = createAsyncThunk('recipesData/deleteAllRecipes',
  async () => {
    await deleteCollection('recipes');

    return getRecipes();
  }
);

const recipeSlice = createSlice({
  name: 'recipesData',
  initialState: {},

  extraReducers: (builder) => {

    builder.addCase(fetchRecipesData.fulfilled, (state, action) => {
      state.recipes = action.payload;
    })
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      return state;
    })
    builder.addCase(editRecipe.fulfilled, (state, action) => {
      return state;
    })
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      return state;
    })
    builder.addCase(deleteAllRecipes.fulfilled, (state, action) => {
      return state;
    })
  }
})

export { fetchRecipesData, addRecipe, editRecipe, deleteRecipe, deleteAllRecipes };

export default recipeSlice.reducer;