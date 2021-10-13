/**
 * Footer Component
 * Renders a footer on every page with an About Link, total products listed or null (dynamic), delete all buttons (dynamic), and Logout
 * Functional Component
 * Uses: React-Router (Link, useLocation)
 * Imported Components: None
 * State: None
 * Props: 
 * Hooks: None
 * Functions: None
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { deleteAllProducts } from '../../features/products';
import { deleteAllUsers } from '../../features/users';

import './footer.styles.scss';

const Footer = (props) => {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
  <div className='footer'>
    <Link to='/about'>About</Link>
    <div className='footer-item-total'>
      {/* Renders Length of correct props according to users location */}
      {
        pathname === '/' || pathname === '/manage/edit-products'
          ? <div>{props.sortedProds ? props.sortedProds.length : '0'} items</div>
          : null
      }
      {
        pathname === '/recipes' || pathname === '/manage/edit-recipes'
          ? <div>{Object.entries(props.recipes).length <= 0 ? '0' : Object.entries(props.recipes).length} items</div>
          : null
      }
      {
        pathname === '/manage/edit-users'
          ? <div>{Object.entries(props.users).length} items</div>
          : null
      }
      {
        pathname === '/order-sheet'
          ? <div>{Object.entries(props.onOrder).length} items</div>
          : null
      }
    </div>
    <div className='footer-nav'>
      {/* Renders proper buttons according to users location */}
      {
        pathname !== '/order-sheet' ?
          (<Link to='/order-sheet'><button className='footer-nav--ordersheet'>Order Sheet</button></Link>)
          : null
      }
      {
        pathname.includes('edit-products') && props.loggedInUser.toLowerCase() === 'manager' ?
          (<button className='footer-nav--submit' onClick={() => {
            if (window.confirm(`Are you sure you want to delete all Products?`)) {
              props.onDeleteProducts();
              history.push('/manage/edit-products');
            } else return;
          }}>Delete All!</button>)
        : null
      }
      {
        pathname === '/manage/edit-users' && props.loggedInUser.toLowerCase() === 'manager' ?
          (<button className='footer-nav--submit' onClick={() => props.deleteAllUsers()}>Delete All!</button>)
        : null
      }
      {
        pathname.includes('edit-recipes') && props.loggedInUser.toLowerCase() === 'manager' ?
          (<button className='footer-nav--submit' onClick={() => props.deleteAllData('recipes')}>Delete All!</button>)
          : null
      }
      <button  className='footer-nav--logout' onClick={props.signOut}>Logout</button>
    </div>
  </div>
)};

const mapDispatchToProps = (dispatch) => ({
  onDeleteProducts: () => dispatch(deleteAllProducts()),
  onDeleteUsers: () => dispatch(deleteAllUsers()),
})

export default connect(null, mapDispatchToProps)(Footer);