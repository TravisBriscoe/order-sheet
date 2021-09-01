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

  // onMenuSelect(sortedSelect) {
  //   const { dist, sWhat, sWhere } = sortedSelect;
  //   let sortedList;

    // const sortMe = (sortWhat, sortWho, sortList = this.state.products) => {
    //   const newStuff = sortList.filter(x => {
    //     console.log(this.state[sortWhat] === x[sortWho])
    //     return x[sortWho] === this.state[sortWho]
    //   })
    //
    //   return this.setState({ sortedProds: [...newStuff]}, () => sortedList => this.state.sortedProds)
    // }

    // this.setState({ distributor: dist}, () => {
    //   this.setState({ storedWhat: sWhat}, () => {
    //     this.setState({ storedWhere: sWhere}, () => {
    //       if (!sortedList) sortedList = this.state.sortedProds;
    //       if (this.state.distributor !== 'all' && this.state.storedWhere === 'all' && this.state.storedWhat === 'all') {
    //         const newStuff = sortMe(this.state.distributor, dist)
    //       }
    //       if (this.state.distributor === 'all' && this.state.storedWhere !== 'all' && this.state.storedWhat !== 'all') { sortMe()}

    //     })
    //   })
    // })

    // this.state.distributor !
    // !this.state.distributor
    // this.state.storedWhere
    // !this.state.storedWhere
    // this.state.storedWhat
    // !this.state.storedWhat
    // this.setState({ distributor: dist }, () => {
    //   if (this.state.distributor !== 'all' && this.state.storedWhere === 'all' && this.state.storedWhat === 'all') {
    //     const newStuff = this.state.products.filter(x => {
    //       console.log(this.state.distributor === x.dist)
    //       return x.dist === this.state.distributor
    //     })
        
    //     console.log(newStuff)
    //     return this.setState({ sortedProds: [
    //       ...newStuff,
    //     ]}, () => {console.log(this.state.sortedProds); sortedList = this.state.sortedProds; console.log(sortedList)})
    //   } else if (this.state.storedWhat !== 'all' && this.state.distributor !== 'all' && this.state.storedWhere !== 'all') {
    //     const newStuff = sortedList.filter(x => {
    //       return x.dist === this.state.distributor
    //     })
        
    //     return this.setState({ sortedProds: [
    //       ...newStuff,
    //     ]}, () => {console.log(this.state.sortedProds); sortedList = this.state.sortedProds; console.log(sortedList)})
    //   }
      
      // return this.setState({ sortedProds: this.state.products }, () => console.log(this.state.sortedProds))

    // });

    // this.setState({ storedWhere: sWhere }, () => {
    //   if (!sortedList) sortedList = this.state.sortedProds;
    //   if (this.state.storedWhere !== 'all'  && this.state.distributor === 'all' && this.state.storedWhat === 'all') {
    //     const newStuff = this.state.products.filter(x => {
    //       return x.stored === this.state.storedWhere
    //     })
        
    //     return this.setState({ sortedProds: [
    //       ...newStuff,
    //     ]}, () => {console.log(this.state.sortedProds); sortedList = this.state.sortedProds})
    //   } else if (this.state.storedWhat !== 'all' && this.state.distributor !== 'all' && this.state.storedWhere !== 'all') {
    //     const newStuff = sortedList.filter(x => {
    //       return x.stored === this.state.storedWhere
    //     })
        
    //     return this.setState({ sortedProds: [
    //       ...newStuff,
    //     ]}, () => {console.log(this.state.sortedProds); sortedList = this.state.sortedProds})
    //   }
      // else {
      //   this.setState({ sortedProds: this.state.products }, () => sortedList = this.state.sortedProds)
      // }
    // });

    // this.setState({ storedWhat: sWhat }, () => {
    //   if (!sortedList) sortedList = this.state.sortedProds;
    //   if (this.state.storedWhat !== 'all'  && this.state.storedWhere === 'all' && this.state.distributor === 'all') {
    //     const newStuff = this.state.products.filter(x => {
    //       return x.category === this.state.storedWhat
    //     })
        
    //     return this.setState({ sortedProds: [
    //       ...newStuff,
    //     ]}, () => {console.log(this.state.sortedProds); sortedList = this.state.sortedProds})
    //   } else if (this.state.storedWhat !== 'all' && this.state.distributor !== 'all' && this.state.storedWhere !== 'all') {
    //     const newStuff = sortedList.filter(x => {
    //       return x.category === this.state.storedWhat
    //     })
        
    //     return this.setState({ sortedProds: [
    //       ...newStuff,
    //     ]}, () => {console.log(this.state.sortedProds); sortedList = this.state.sortedProds; console.log(sortedList)})
    //   }
      // else {
      //   this.setState({ sortedProds: this.state.products }, () => sortedList = this.state.sortedProds)
      // }
    // });

    // if (this.state.storedWhat === 'all' && this.state.storedWhere === 'all' && this.state.distributor === 'all') {
    //   this.setState({ sortedProds: this.state.products });
    // }
  // }

  onMenuSelect(sortedSelect) {
    const { dist, sWhat, sWhere } = sortedSelect;

    this.setState({ distributor: dist }, () => {  
      if (this.state.distributor !== 'all') {
        const newStuff = this.state.products.filter(x => {
          return x.dist === this.state.distributor
        })
        
        return this.setState({ sortedProds: [
          ...newStuff,
        ]})
      }
    });

    this.setState({ storedWhere: sWhere }, () => {  
      if (this.state.storedWhere !== 'all') {
        const newStuff = this.state.products.filter(x => {
          return x.stored === this.state.storedWhere
        })
        
        return this.setState({ sortedProds: [
          ...newStuff,
        ]})
      }
    });
    this.setState({ storedWhat: sWhat }, () => {  
      if (this.state.storedWhat !== 'all') {
        const newStuff = this.state.products.filter(x => {
          return x.category === this.state.storedWhat
        })
        
        return this.setState({ sortedProds: [
          ...newStuff,
        ]})
      }
    });
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
