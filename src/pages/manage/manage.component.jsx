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
              />} />
            <Route path='/manage/edit-users' render={(props) =>
              <ManageUsers
                {...props}
                users={users}
                userLoggedIn={this.state.userLoggedIn}
                onUpdateEntry={this.props.onUpdateEntry}
                onNewEntry={this.props.onNewEntry}
                onDeleteEntry={this.props.onDeleteEntry}  
              />}
            />
            <Route path='/manage/edit-recipes' render={(props) =>
              <ManageRecipes
                {...props}
                recipes={recipes}
                onDeleteEntry={this.props.onDeleteEntry}
              />}
            />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(ManagePage);