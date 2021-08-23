import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import ProductList from './pages/product-list/product-list.component';
import ManagePage from './pages/manage/manage.component';
import OrderListPage from './pages/order-list/order-list.component';
import RecipesPage from './pages/recipes/recipes.component';
import LoginComponent from './components/login/login.component.jsx';

import PRODUCT_DATA from './data/product.data';

import { userData, recipeData } from './firebase/firebase.utils';

// import logo from './logo.svg';
import './App.scss';

class App extends React.Component {
  constructor() {
    super() 

    this.setUserLoggedIn = this.setUserLoggedIn.bind(this);

    this.state = {
      isUserLoggedIn: false,
      loggedInUser: '',
      users: '',
      products: PRODUCT_DATA,
      recipes: '',
    }
  }

  setUserLoggedIn(status, user) {
    this.setState({isUserLoggedIn: status });
    this.setState({loggedInUser: user});
  }

  componentDidMount() {

    const getUserData = async () => {
      const userDataObj = await userData();
      
      this.setState({users: userDataObj})
    }
  
    const getRecipeData = async () => {
      const recipeDataObj = await recipeData();

      this.setState({recipes: recipeDataObj})
    }

    getUserData();
    getRecipeData();
  }

  render() {
    const { isUserLoggedIn, loggedInUser, title, users, products, recipes } = this.state;

    return (
      <div>
        { 
          !isUserLoggedIn ? 
          (
            <div className={'App'}>
              <LoginComponent
                isUserLoggedIn={isUserLoggedIn}
                setUserLoggedIn={this.setUserLoggedIn}
                {...this.state}
              />
            </div>
          )
          :
          (
            <div className={'App'}>
              <Header isUserLoggedIn={isUserLoggedIn} userLoggedIn={loggedInUser} users={users} title={title} />
              <Switch>
                <Route path='/manage' render={(props) => <ManagePage {...props} userLoggedIn={loggedInUser} users={users} products={products} />} />
                <Route path='/order-sheet' component={OrderListPage} />
                <Route path='/recipes' render={(props) => <RecipesPage {...props} recipes={recipes} />} />
                <Route exact path='/' render={(props) => <ProductList {...props} products={products} />} />
              </Switch>
              <Footer isUserLoggedIn={isUserLoggedIn} />
            </div>
          )
        }
      </div>
    );
  }
};

export default withRouter(App);
