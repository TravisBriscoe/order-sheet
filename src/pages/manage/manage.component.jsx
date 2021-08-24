import React from 'react';

import { Switch, Route, NavLink, withRouter } from 'react-router-dom';

import ManageProducts from '../../components/manage-products/manage-products.component';
import ManageUsers from '../../components/manage-users/manage-users.component';
import ManageRecipes from '../../components/manage-recipes/manage-recipes.component';

import './manage.styles.scss';

class ManagePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSelected: false,
      userLoggedIn: this.props.userLoggedIn,
      users: this.props.users,
      products: this.props.products,
      recipes: this.props.recipes,
    }
  }

  render() {
    
    return (
      <div className='manage-page'>
        <div className='manage-page-header'>
          <NavLink
            to='/manage/edit-products'
            className={'manage-page-header--link_products'}
            activeStyle={{backgroundColor: "blue", color: "white"}}
          >Manage Products</NavLink>
          <NavLink
            to={{ pathname: '/manage/edit-users', state: { userLoggedIn: this.state.userLoggedIn } }}
            className='manage-page-header--link_users'
            activeStyle={{backgroundColor: "blue", color: "white"}}
          >Manage Users</NavLink>
          <NavLink
            to={{ pathname: '/manage/edit-recipes'}}
            className='manage-page-header--link_recipes'
            activeStyle={{backgroundColor: 'blue', color: 'white'}}
          >Manage Recipes</NavLink>
        </div>
        <div className='manage-page-content'>  
          <Switch>
            <Route path='/manage/edit-products' component={ManageProducts} />
            {/* <Route path='/manage/edit-products' render={(props) => <ManageProducts {...props} products={products} />} /> */}
            <Route path='/manage/edit-users' render={(props) => <ManageUsers {...props} users={this.state.users} userLoggedIn={this.state.userLoggedIn} />} />
            <Route path='/manage/edit-recipes' render={(props) => <ManageRecipes {...props} recipes={this.state.recipes} />} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(ManagePage);