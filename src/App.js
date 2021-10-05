import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import { fetchProducts } from './redux/products/products.actions';
import { fetchRecipes } from './redux/recipes/recipes.actions';
import { fetchUsers } from './redux/users/users.actions';
import { fetchOrder } from './redux/order-list/order-list.actions'

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import ProductList from './pages/product-list/product-list.component';
import ManagePage from './pages/manage/manage.component';
import OrderListPage from './pages/order-list/order-list.component';
import RecipesPage from './pages/recipes/recipes.component';
import LoginComponent from './components/login/login.component.jsx';
import AboutPage from './pages/about/about.component';

import { userData, recipeData, productData, orderListData, recipes, firestore, users, products, updateEntry, addNewEntry, deleteEntry, orderlist } from './firebase/firebase.utils';

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
    
    this.deleteAllData = this.deleteAllData.bind(this);
    this.onUpdateEntry = this.onUpdateEntry.bind(this);
    this.onNewEntry = this.onNewEntry.bind(this);
    this.onDeleteEntry = this.onDeleteEntry.bind(this);
    this.onChangeOrderValue = this.onChangeOrderValue.bind(this);
    this.onSaveProduct = this.onSaveProduct.bind(this);
    this.onSaveRecipe = this.onSaveRecipe.bind(this);
    this.onCreateRecipe = this.onCreateRecipe.bind(this);

    this.state = {
      loggedInUser: '',
      notification: false,
      onQuantity: 0,
      sortedProds: '',
      distributor: 'all',
      storedWhere: 'all',
      storedWhat: 'all',
      sortCategory: 'all',
      isLoading: false,
      onNewRecipe: false,
    }
  }

  // setting intiial state from database when component mounts
  componentDidMount() {
    
    const getData = async () => {
      this.setState({ isLoading: true });

      // const userDataObj = await userData();
      // const recipeDataObj = await recipeData();
      // const productDataObj = await productData();
      // const orderListDataObj = await orderListData();
      // this.setState({ users: userDataObj });
      // this.setState({ recipes: recipeDataObj });
      // this.setState({ onOrder: orderListDataObj });

      await this.props.fetchProducts();
      await this.props.fetchRecipes();
      await this.props.fetchUsers();
      await this.props.fetchOrder();

      
      const { sortedProds } = this.state;
      const { products } = this.props;

      if (!sortedProds || sortedProds.length <= 0) {
        this.setState({ sortedProds: products})
      } else {
        this.setState({ sortedProds: [...sortedProds]})
      }

      this.setState({ isLoading: false })
    }
    
    getData();
  }

  // Set Some states
  setUserLoggedIn(user) {
    // this.props.history.push('/');
    return this.setState({ loggedInUser: user });
  }

  setNotification(notifications) {
    if (notifications) {
      return this.setState({ notification: false });
    } else {
      return this.setState({ notification: true });
    }
  }

  setSignOut() {
    this.setState({ loggedInUser: '' });
    window.localStorage.clear();
    return this.props.history.push('/');
  }

  // Add Products to order-list
  async setOnOrder(orderProducts) {
    this.setState({ notification: true });
    this.onNewEntry('orderlist', orderProducts);
    const orderListDataObj = await orderListData();
    this.setState({ onOrder: orderListDataObj });
  }

  // Handle the searchbar and set the sortedProds state
  onHandleSearch = (e) => {
    const { products } = this.props;
    const searchData1 = products.filter((product) => {
       return product.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    const searchData2 = products.filter((product) => {
      return product.desc.toLowerCase().includes(e.target.value.toLowerCase())
    });

    const searchData = [...searchData1, ...searchData2].filter((x, i, a) => a.indexOf(x) === i)
    this.setState({ sortedProds: searchData });
  }

  // Handle dropdown menu for product search and set sortedProds state
  onMenuSelect(sortedSelect) {
    console.log(this.props.products)
    const { products } = this.props;
    this.setState({ sortCategory: sortedSelect }, () => {
      const { sortCategory } = this.state;

      if (sortCategory === 'all') {
        return this.setState({ sortedProds: products })
      } else if (sortCategory === 'findlays' || sortCategory === 'quattrocchis' || sortCategory === 'pigolive') {
        const newStuff = products.filter(x => {
          return x.dist === sortCategory
        })
        
        return this.setState({ sortedProds: [
          ...newStuff,
        ]})
      } else if (sortCategory === '') {
        return;
      } else if (sortCategory === 'user') {
        const newStuff = products.filter(x => {
          return x.id.includes('U')
        })

        return this.setState({ sortedProds: [...newStuff]});
      } else {
        const newStuff = products.filter(x => {
          return x.category === sortCategory
        })
                
        return this.setState({ sortedProds: [
          ...newStuff,
        ]})
      }
    })
  }

  // Function for changing product order value within Order sheet
  onChangeOrderValue(event, data) {
    const { value } = event.target;
    console.log(data)

    this.setState((prevState) => {
      return ({
        ...prevState.onOrder,
        [data.id]: {
          ...prevState.onOrder[data.id],
          data: {
            ...prevState.onOrder[data.id].data,
            ...data.data,
            value: value,
          }
        }
      })
    }, async () => {
      await updateEntry(orderlist, this.state.onOrder[data.id])
      const orderListDataObj = await orderListData();

      this.setState({ onOrder: orderListDataObj})
    })
  }

  // Function for saving New Product data and updating state and database
  async onSaveProduct(data) {
    
    this.onNewEntry('products', data);
    const productDataObj = await productData();
    const productDataArr = Object.entries(productDataObj).map(x => {
      return x[1];
    });
    
    productDataArr.sort((a, b) => a.name.localeCompare(b.name));

    this.setState({ products: productDataArr, sortedProds: productDataArr })
  }

  // onCreateRecipe function that propogates state and determines whether to render the AddRecipe component
  onCreateRecipe() {
    const value = !this.state.onNewRecipe;

    this.props.history.push('/manage/edit-recipes');

    this.setState({ onNewRecipe: value });
  }

  // Function for saving NewRecipe data to database and updating existing state
  async onSaveRecipe(data) {

    this.onNewEntry('recipes', data);

    const recipeDataObj = await recipeData();
    this.setState({ recipes: recipeDataObj });
  }

  // Modify firebase data (CRUDs)
  // Helper function to set the collection reference to correct collection
  setCollectionRef(collectionRef) {
    if (collectionRef === 'users') collectionRef = users;
    else if (collectionRef === 'products') collectionRef = products;
    else if (collectionRef === 'orderlist') collectionRef = orderlist;
    else collectionRef = recipes;
    
    return collectionRef;
  }

  // function for deleting collections within the database (users, recipes, or products)
  async deleteAllData(collection) {
    let text = collection;

    if (text === 'onOrder') text = 'products on the Order-Sheet'
    else if (text === 'users') text = 'Users (Initial Manager Role will be untouched)';

    if (window.confirm(`Are you sure you want to delete all ${text}?`)) {
      this.setState({ isLoading: true})

      if (collection === 'users') {
        await userData().then((snapshot) => Object.entries(snapshot).filter(doc => {
          return doc[1].id !== '0001'
        })).then(docs => docs.map(async doc => {
          return await users.doc(doc[1].id).delete()
        })).then(async () => {
          const userDataObj = await userData();
          this.setState({users: userDataObj})})
        } else {
          const batch = firestore.batch();
          collection = this.setCollectionRef(collection);
          
          await collection.get().then((data) => data.docs.map(doc => {
            return batch.delete(doc.ref);
          }));
          
          await batch.commit();
        }
        
        
        if (collection === products) this.setState({ products: '', sortedProds: ''}, () => this.props.history.push('/manage/edit-products'));
        else if (collection === recipes) this.setState({ recipes: '' }, () => this.props.history.push('/manage/edit-recipes'));
        else if (collection === orderlist) this.setState({ onOrder: {} }, () => alert('Order-Sheet has been cleared!'));
      }
      
      this.setState({ isLoading: false });
  }

  // Update existing entry
  async onUpdateEntry(collectionRef, data) {
    const collection = collectionRef;

    collectionRef = this.setCollectionRef(collectionRef);

    if (collection === 'users') {
      return this.props.editUser(collectionRef, data);
    }

    await updateEntry(collectionRef, data);


    if (collection === 'products') {
      const productDataObj = await productData();
      const productDataArr = Object.entries(productDataObj).map(x => {
        return x[1];
      });
      
      productDataArr.sort((a, b) => a.name.localeCompare(b.name));

      this.setState({ products: productDataArr }, () => {
        const { products, sortedProds } = this.state;

        if (!sortedProds || sortedProds.length <= 0) {
          this.setState({ sortedProds: [...products]})
        }
      });
    }
  }
  
  // Create new entry
  async onNewEntry(collectionRef, data) {
    collectionRef = this.setCollectionRef(collectionRef);

    await addNewEntry(collectionRef, data);
  }
  
  // Delete existing entry (delete all is in Footer component)
  async onDeleteEntry(collectionRef, data) {
    
    const collection = collectionRef;

    const alertWindow = () => {
      return alert('Data deleted!');
    }

    if (window.confirm(`Are you sure you want to delete ${collectionRef}: ${data.name}?`)) {
      collectionRef = this.setCollectionRef(collectionRef);
  
      await deleteEntry(collectionRef, data);
      
      if (collection === 'users') {
        this.setState({ isLoading: true })
        const userDataObj = await userData();

        this.setState({ users: userDataObj }, () => {
          alertWindow()
          this.setState({ isLoading: false })
        })
      } else if (collection === 'products') {
        this.setState({ isLoading: true })
        const productDataObj = await productData();
        const productDataArr = Object.entries(productDataObj).map(x => {
          return x[1];
        });
        
        const sortedProd = this.state.sortedProds.filter(prod => prod.name !== data.name);
        productDataArr.sort((a, b) => a.name.localeCompare(b.name));

        this.setState({ products: productDataArr }, () => {
          this.setState({ sortedProds: sortedProd}, () => {
            this.setState({ isLoading: false });            
          })
        });
      } else if (collection === 'recipes') {
        const recipeDataObj = await recipeData();

        this.setState({ recipes: recipeDataObj}, () => alertWindow());
      } else if (collection === 'orderlist') {
        const orderSheetObj = await orderListData();

        this.setState({ onOrder: orderSheetObj }, () => alertWindow());
      }
    }
  }

  render() {
    const {
      loggedInUser,
      title,
      notification,
      sortedProds,
      sortCategory,
     } = this.state;

     const {
       products,
       recipes,
       users,
       onOrder
    } = this.props;

    return (
      <div>
        { 
          !loggedInUser ? 
          (
            <div className='App'>
              <LoginComponent
                setUserLoggedIn={this.setUserLoggedIn}
                {...this.state}
                {...this.props}
              />
            </div>
          )
          :
          (
            <div className='App'>
              <Header loggedInUser={loggedInUser} users={users} title={title} notification={notification} setNotification={this.setNotification} />
              <Switch>
                <Route path='/manage' render={(props) =>
                  <ManagePage
                    {...props}
                    sortedProds={sortedProds}
                    userLoggedIn={loggedInUser}
                    users={users}
                    products={products}
                    recipes={recipes}
                    onUpdateEntry={this.onUpdateEntry}
                    onNewEntry={this.onNewEntry} 
                    onDeleteEntry={this.onDeleteEntry}
                    onHandleSearch={this.onHandleSearch}
                    onSaveProduct={this.onSaveProduct}
                    onSaveRecipe={this.onSaveRecipe}
                    sortCategory={sortCategory}
                    onMenuSelect={this.onMenuSelect}
                    isLoading={this.state.isLoading}
                    onNewRecipe={this.state.onNewRecipe}
                  />}
                />
                <Route path='/order-sheet' render={(props) => 
                  <OrderListPage
                    {...props}
                    onOrder={onOrder}
                    deleteAllData={this.deleteAllData}
                    onDeleteEntry={this.onDeleteEntry}
                    onChangeOrderValue={this.onChangeOrderValue}
                  />}
                />
                <Route path='/recipes' render={(props) => <RecipesPage {...props}  onNewRecipe={this.state.onNewRecipe} onSaveRecipe={this.onSaveRecipe} recipes={recipes} />} />
                <Route path='/about' component={AboutPage} />
                <Route exact path='/' render={(props) =>
                  <ProductList
                    {...props}
                    setOnOrder={this.setOnOrder}
                    onMenuSelect={this.onMenuSelect}
                    sortedProds={sortedProds}
                    onHandleSearch={this.onHandleSearch}
                    sortCategory={this.state.sortCategory}
                    onOrder={onOrder}
                    isLoading={this.state.isLoading}
                    onSaveProduct={this.onSaveProduct}
                  />}
                />
              </Switch>
              <Footer
                loggedInUser={loggedInUser}
                sortedProds={sortedProds}
                users={users}
                recipes={recipes}
                onOrder={onOrder}
                signOut={this.setSignOut}
                deleteAllData={this.deleteAllData}
              />
            </div>
          )   
        }
      </div>
    );
  }
};

const mapStateToProps = state => ({
  products: state.products.products,
  recipes: state.recipes.recipes,
  users: state.users.users,
  onOrder: state.onOrder.onOrder
})

export default connect(mapStateToProps, { fetchProducts, fetchRecipes, fetchUsers, fetchOrder })(withRouter(App));