import React from 'react';

const EditProduct = (props) => {
  const { product } = props;

  return (
    <div>
      <input placeholder={`ID: ${product.id}`} readOnly />
      <input placeholder={`Name: ${product.name}`} readOnly />
      <input placeholder={`Unit: ${product.unit}`} readOnly />
      <input placeholder={`Description: ${product.desc}`} readOnly />
      <input type='checkbox' readOnly disabled inputProps={{ readOnly: true }} checked={product.split ? 'checked' : null} />
      <button onClick={() => props.setUseHidden(product.id, false)}>Done</button>
    </div>
  );
}

export default EditProduct;