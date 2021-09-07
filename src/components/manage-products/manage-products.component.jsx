import React from 'react';

import EditProducts from '../edit-products/edit-products.component';

const ManageProducts = (props) => {
  return (
    <div className='manage-products'>
      <div className='manage-products-title'>
        <h3>Manage Products</h3>
      </div>
      <EditProducts products={props.products} />
    </div>
  );
}

export default ManageProducts;