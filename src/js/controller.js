import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
// import addHandlerRender from './views/recipeView.js';

// import icons from '../img/icons.svg'; // parcel 1
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    //using the # to
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    //1. loading recipe the recipe
    await model.loadRecipe(id);

    //2. Rendering recipe:
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1) Get search query and clear search bar;
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
