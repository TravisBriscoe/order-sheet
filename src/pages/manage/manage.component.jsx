/** Management page for Products, Users and Recipes
 * Class Component
 * Allows creating, updating and deleting single or all entries.
 * Passes several props and state to various Components
 * Uses: React-Router (Switch, Route, NavLink, withRouter)
 * Imported Components: ManageProducts, ManageUsers, ManageRecipes
 * State: userLoggedIn: {}
 * Props: userLoggedIn, recipes, products, users, isLoading, onDeleteEntry(), sortedProds, onUpdateEntry(), onNewEntry(), onHandleSearch(), sortCategory(), onSaveRecipe(), onMenuSelect()
 * Hooks: None
 * Functions: None
*/

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
      userLoggedIn: this.props.userLoggedIn,
    }
  }

  render() {
    const { recipes, products, users } = this.props;
    
    return (
      <div className='manage-page'>
        <div className='manage-page-header'>
          <NavLink
            to='/manage/edit-products'
            className='manage-page-header--link_products'
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
            <Route path='/manage/edit-products' render={(props) =>
              <ManageProducts
                {...props}
                products={products}
                sortedProds={this.props.sortedProds}
                onUpdateEntry={this.props.onUpdateEntry}
                onDeleteEntry={this.props.onDeleteEntry}
                onNewEntry={this.props.onNewEntry}
                onHandleSearch={this.props.onHandleSearch}
                onSaveProduct={this.props.onSaveProduct}
                sortCategory={this.props.sortCategory}
                onMenuSelect={this.props.onMenuSelect}
                isLoading={this.props.isLoading}
              />} />
            <Route path='/manage/edit-users' render={(props) =>
              <ManageUsers
                {...props}
                users={users}
                userLoggedIn={this.state.userLoggedIn}
                onUpdateEntry={this.props.onUpdateEntry}
                onNewEntry={this.props.onNewEntry}
                onDeleteEntry={this.props.onDeleteEntry}
                onEditUser={this.props.onEditUser}
              />}
            />
            <Route path='/manage/edit-recipes' render={(props) =>
              <ManageRecipes
                {...props}
                recipes={recipes}
                onDeleteEntry={this.props.onDeleteEntry}
                isLoading={this.props.isLoading}
                onSaveRecipe={this.props.onSaveRecipe}
                onNewRecipe={this.props.onNewRecipe}
              />}
            />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(ManagePage);