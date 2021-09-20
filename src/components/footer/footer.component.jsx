import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './footer.styles.scss';


const Footer = (props) => {
  const { pathname } = useLocation();

  return (
  <div className='footer'>
    <Link to='/about'>About</Link>
    <div className='footer-item-total'>
      {
        pathname === '/' ?
        <div>{props.sortedProds ? props.sortedProds.length : '0'} items</div>
        : null
      }
    </div>
    <div className='footer-nav--ordersheet'>
      {
        pathname === '/' ?
          (<Link to='/order-sheet'><button>Order Sheet</button></Link>)
          : null
      }
      {
        pathname.includes('edit-products') && props.loggedInUser.toLowerCase() === 'manager' ?
          (<button onClick={() => props.deleteAllData('products', 'products')}>Delete All!</button>)
        : null
      }
      {
        pathname === '/manage/edit-users' && props.loggedInUser.toLowerCase() === 'manager' ?
          (<button onClick={() => props.deleteAllData('users', 'users')}>Delete All!</button>)
        : null
      }
      {
        pathname.includes('edit-recipes') && props.loggedInUser.toLowerCase() === 'manager' ?
          (<button onClick={() => props.deleteAllData('recipes', 'recipes')}>Delete All!</button>)
          : null
      }
    </div>
    <div className='footer-nav--logout'>
      <button onClick={props.signOut}>Logout</button>
    </div>
  </div>
)};

export default Footer;