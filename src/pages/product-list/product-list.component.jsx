import React from 'react';

import './product-list.styles.scss';

const ProductList = () => (
  <div className='product'>
    <div className='product-headers'>
      <div className='product-headers-name'>Name</div>
      <div className='product-headers-desc'>Description</div>
      <div className='product-headers-unit'>Unit (Split?)</div>
      <div className='product-headers-quantity'>Order Quantity</div>
    </div>
    <div>
      <div className='product-items'>
        <div>Cheese</div>
        <div>Cheddar, shredded</div>
        <div>4x Bags/cs (Yes)</div>
        <input className='product-items-quantity' type='text' placeholder='1'></input>
      </div>
    </div>
  </div>
);

export default ProductList;