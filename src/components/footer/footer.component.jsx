import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './footer.styles.scss';

const Footer = (props) => {
  const { pathname } = useLocation();

  return (
  <div className='footer'>
    <Link to='/about'>About</Link>
    <div className='footer-item-total'>12 items</div>
    <div className='footer-nav--submit'>
      {
        pathname === '/' ?
        (<button>Commit</button>)
        : null
      }
    </div>
    <div className='footer-nav--ordersheet'>
      {
        pathname === '/' ?
          (<Link to='/order-sheet'><button>Order Sheet</button></Link>)
          : null
      }
    </div>
  </div>
)};

export default Footer;