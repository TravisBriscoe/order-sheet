import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import ProductList from './pages/product-list/product-list.component';
import ManagePage from './pages/manage/manage.component';
import OrderListPage from './pages/order-list/order-list.component';
import RecipesPage from './pages/recipes/recipes.component';
import LoginComponent from './components/login/login.component.jsx';
import AboutPage from './pages/about/about.component';

import PRODUCT_DATA from './data/product.data';

import { userData, recipeData } from './firebase/firebase.utils';

// import logo from './logo.svg';
import './App.scss';

class App extends React.Component {
  constructor() {
    super() 

    this.setUserLoggedIn = this.setUserLoggedIn.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.setSignOut = this.setSignOut.bind(this);
    this.setOnOrder = this.setOnOrder.bind(this);
    this.onMenuSelect = this.onMenuSelect.bind(this);

    this.state = {
      loggedInUser: '',
      users: '',
      products: PRODUCT_DATA,
      recipes: '',
      notification: false,
      onOrder: {},
      onQuantity: 0,
      sortedProds: '',
      distributor: 'all',
      storedWhere: 'all',
      storedWhat: 'all',
    }
  }

  setUserLoggedIn(user) {
    this.props.history.push('/');
    return this.setState({ loggedInUser: user });
  }

  setNotification(notifications) {
    if (notifications) {
      return this.setState({ notification: false });
    } else {
      return this.setState({ notification: true });
    }
  }

  componentDidMount() {

    const getData = async () => {
      const userDataObj = await userData();
      const recipeDataObj = await recipeData();

      this.setState({users: userDataObj})
      this.setState({recipes: recipeDataObj})
    }

    const { products, sortedProds } = this.state;

    if (!sortedProds || sortedProds.length <= 0) {
      this.setState({ sortedProds: [...products]})
    } else {
      this.setState({ sortedProds: [...sortedProds]})
    }

    return getData();
  }

  setSignOut() {
    this.setState({ loggedInUser: '' });
    window.localStorage.clear();
    return this.props.history.push('/');
  }

  setOnOrder(orderProducts) {
    this.setState({ notification: true });
    this.setState({ onOrder: orderProducts });
  }

  // setSortedProds(sortedBy) {
  //   const { products, sortedProds } = this.state;

  //   console.log(Object.entries(products))

  //   if (!sortedProds) {
  //     this.setState({ sortedProds: products}, () => console.log(this.state.sortedProds))
  //   }
  // }

  onMenuSelect(sortedSelect) {
    const { dist, sWhat, sWhere } = sortedSelect;

    this.setState({ distributor: dist },
      () => {  
      if (this.state.distributor !== 'all') {
        const newStuff = this.state.products.filter(x => {
          return x.dist === this.state.distributor
        })
        
        return this.setState({ sortedProds: [
          ...newStuff,
        ]})
      }
    });

    this.setState({ storedWhere: sWhere }, () => console.log(this.state.storedWhere))
    this.setState({ storedWhat: sWhat }, () => console.log(this.state.storedWhat));
  }

  render() {
    const {
      loggedInUser,
      title,
      users,
      products,
      recipes,
      notification,
      onOrder,
      sortedProds,
     } = this.state;

    return (
      <div>
        { 
          !loggedInUser ? 
          (
            <div className={'App'}>
              <LoginComponent
                setUserLoggedIn={this.setUserLoggedIn}
                {...this.state}
              />
            </div>
          )
          :
          (
            <div className={'App'}>
              <Header loggedInUser={loggedInUser} users={users} title={title} notification={notification} setNotification={this.setNotification} />
              <Switch>
                <Route path='/manage' render={(props) => <ManagePage {...props} userLoggedIn={loggedInUser} users={users} products={products} recipes={recipes} />} />
                <Route path='/order-sheet' render={(props) => <OrderListPage {...props} onOrder={onOrder} />} />
                <Route path='/recipes' render={(props) => <RecipesPage {...props} recipes={recipes} />} />
                <Route path='/about' component={AboutPage} />
                <Route path='/' render={(props) =>
                  <ProductList
                    {...props}
                    setOnOrder={this.setOnOrder}
                    onMenuSelect={this.onMenuSelect}
                    sortedProds={sortedProds}
                  />}
                />
              </Switch>
              <Footer loggedInUser={loggedInUser} signOut={this.setSignOut} />
            </div>
          )
          
        }
      </div>
    );
  }
};

export default withRouter(App);
