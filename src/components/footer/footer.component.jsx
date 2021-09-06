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
        <div>{props.sortedProds.length} items</div>
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
        pathname.includes('edit-recipes') ?
          (<button onClick={props.deleteAllRecipes}>Delete All!</button>)
          : null
      }
    </div>
    <div className='footer-nav--logout'>
      <button onClick={props.signOut}>Logout</button>
    </div>
  </div>
)};

export default Footer;