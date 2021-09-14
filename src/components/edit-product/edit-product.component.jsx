import React from 'react';

const EditProduct = (props) => {
  const { product } = props;

  return (
    <div className='edit-product'>
      <input className='edit-product-id' placeholder={`ID: ${product.id}`} readOnly />
      <input className='edit-product-name' placeholder={`Name: ${product.name}`} readOnly />
      <input className='edit-product-unit' placeholder={`Unit: ${product.unit}`} readOnly />
      <input className='edit-product-desc' placeholder={`Description: ${product.desc}`} readOnly />
      <input className='edit-product-split' type='checkbox' readOnly disabled checked={product.split ? 'checked' : null} />
      <button className='edit-product-btn--save'>Save</button>
      <button className='edit-product-btn--delete'>Delete</button>
      {/* <button className='edit-product-btn--cancel' onClick={() => props.setUseHidden(product.id, false) }>Cancel</button> */}
    </div>
  );
}

export default EditProduct;