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

import { userData, recipeData, productData } from './firebase/firebase.utils';

import './App.scss';

class App extends React.Component {
  constructor() {
    super() 

    this.setUserLoggedIn = this.setUserLoggedIn.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.setSignOut = this.setSignOut.bind(this);
    this.setOnOrder = this.setOnOrder.bind(this);
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.onHandleSearch = this.onHandleSearch.bind(this);

    this.state = {
      loggedInUser: '',
      users: '',
      products:'',
      recipes: '',
      notification: false,
      onOrder: {},
      onQuantity: 0,
      sortedProds: '',
      distributor: 'all',
      storedWhere: 'all',
      storedWhat: 'all',
      sortCategory: 'all'
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
      const productDataObj = await productData();
      const productDataArr = Object.entries(productDataObj).map(x => {
        return x[1];
      });
      
      productDataArr.sort((a, b) => a.name.localeCompare(b.name));


      this.setState({ users: userDataObj });
      this.setState({ recipes: recipeDataObj });
      this.setState({ products: productDataArr }, () => {
        const { products, sortedProds } = this.state;

        if (!sortedProds || sortedProds.length <= 0) {
          this.setState({ sortedProds: [...products]})
        } else {
          this.setState({ sortedProds: [...sortedProds]})
        }
      });
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

  onHandleSearch = (e) => {
    const searchData1 = this.state.products.filter((product) => {
       return product.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    const searchData2 = this.state.products.filter((product) => {
      return product.desc.toLowerCase().includes(e.target.value.toLowerCase())
    });

    const searchData = [...searchData1, ...searchData2].filter((x, i, a) => a.indexOf(x) === i)
    this.setState({ sortedProds: searchData });
  }

  onMenuSelect(sortedSelect) {
    this.setState({ sortCategory: sortedSelect }, () => {
      const { sortCategory } = this.state;

      console.log(sortCategory);

      if (sortCategory === 'all') {
        return this.setState({ sortedProds: this.state.products })
      } else if (sortCategory === 'findlays' || sortCategory === 'quattrocchis' || sortCategory === 'pigolive') {
        const newStuff = this.state.products.filter(x => {
          return x.dist === sortCategory
        })
        
        return this.setState({ sortedProds: [
          ...newStuff,
        ]})
      } else if (sortCategory === '') { return; } else {
        const newStuff = this.state.products.filter(x => {
          return x.category === sortCategory
        })
                
        return this.setState({ sortedProds: [
          ...newStuff,
        ]})
      }
    })
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
                    onHandleSearch={this.onHandleSearch}
                    sortCategory={this.state.sortCategory}
                  />}
                />
              </Switch>
              <Footer loggedInUser={loggedInUser} signOut={this.setSignOut} sortedProds={sortedProds} />
            </div>
          )
          
        }
      </div>
    );
  }
};

export default withRouter(App);
