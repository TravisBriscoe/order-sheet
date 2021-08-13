import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './footer.styles.scss';

const Footer = (props) => {

  const { pathname } = useLocation();

  return (
  <div className='footer'>
    <div className='footer-copyright'>&copy; Travis Briscoe, 2021</div>
    <div className='footer-item-total'>12 items</div>
    <div className='footer-nav'>
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
  </div>
)};

export default Footer;