import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

// import logo from './logo.svg';
import './App.scss';
import ProductList from './pages/product-list/product-list.component';
import ManagePage from './pages/manage/manage.component';
import OrderListPage from './pages/order-list/order-list.component';
import RecipesPage from './pages/recipes/recipes.component';
import LoginComponent from './components/login/login.component.jsx';
import USER_DATA from './data/user.data';
import PRODUCT_DATA from './data/product.data';

class App extends React.Component {
  constructor() {
    super() 

    this.setUserLoggedIn = this.setUserLoggedIn.bind(this);

    this.state = {
      isUserLoggedIn: true,
      loggedInUser: 'Admin',
      users: USER_DATA,
      products: PRODUCT_DATA,
    }
  }

  setUserLoggedIn(status, user) {
    this.setState({isUserLoggedIn: status });
    this.setState({loggedInUser: user});

    console.log(this.state);
  }

  render() {
    const { isUserLoggedIn, loggedInUser, title, users, products } = this.state;

    return (
      <div className={`App`}>
        <Header isUserLoggedIn={isUserLoggedIn} userLoggedIn={loggedInUser} title={title} />
        <div className={`${!isUserLoggedIn ? "is-blurred" : ""}`}>
          <Switch>
            <Route path='/manage' render={(props) => <ManagePage {...props} users={users} products={products} />} />
            <Route path='/order-sheet' component={OrderListPage} />
            <Route path='/recipes' component={RecipesPage} />
            <Route exact path='/' render={(props) => <ProductList {...props} products={products} />} />
          </Switch>
        </div>
        <Footer isUserLoggedIn={isUserLoggedIn} />
        {
          !isUserLoggedIn ? 
            (
              <LoginComponent
                isUserLoggedIn={isUserLoggedIn}
                setUserLoggedIn={this.setUserLoggedIn}
                {...this.state}
              />
            )
            : null
        }
      </div>
    );
  }
};

export default withRouter(App);
