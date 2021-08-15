import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

// import logo from './logo.svg';
import './App.scss';
import ProductList from './pages/product-list/product-list.component';
import ManagePage from './pages/manage/manage.component';
import OrderListPage from './pages/order-list/order-list.component';
import RecipesPage from './pages/recipes/recipes.component';
import LoginComponent from './components/login/login.component.jsx';

class App extends React.Component {
  constructor() {
    super() 

    this.setUserLoggedIn = this.setUserLoggedIn.bind(this);

    this.state = {
      isUserLoggedIn: true,
      loggedInUser: 'Manager',
    }
  }

  setUserLoggedIn(status, user) {
    this.setState({isUserLoggedIn: status });
    this.setState({loggedInUser: user});

    console.log(this.state);
  }

  render() {
    const { isUserLoggedIn, loggedInUser, title } = this.state;

    return (
      <div className={`App`}>
        <Header isUserLoggedIn={isUserLoggedIn} userLoggedIn={loggedInUser} title={title} />
        <div className={`${!isUserLoggedIn ? "is-blurred" : ""}`}>
          <Switch>
            <Route path='/manage' component={ManagePage} />
            <Route path='/order-sheet' component={OrderListPage} />
            <Route path='/recipes' component={RecipesPage} />
            <Route exact path='/' component={ProductList} />
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

export default App;
