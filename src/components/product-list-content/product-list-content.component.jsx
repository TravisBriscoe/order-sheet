import React from 'react';

const ProductListContent = ({ products }) => {
  console.log(products)

  return (
    <div>
      {
        products.map(el => {
          return (
            <ul className='product-item' key={el.id}>
              <li className='product-item-name'>{el.name}</li>
              <li className='product-item-desc'>{el.desc}</li>
              <li className='product-item-unit'>{el.unit}</li>
              <input type='checkbox' checked={el.split ? 'checked' : ''} readOnly className='product-item-split' />
              <input type='text' className='product-item-quantity' placeholder='0' />
            </ul>
          )
        })
      } 
    </div>
  );
}

export default ProductListContent;