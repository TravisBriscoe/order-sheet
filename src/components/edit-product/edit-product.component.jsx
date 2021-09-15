import React from 'react';

import { withRouter } from 'react-router-dom';

import './edit-product.styles.scss';

class EditProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    const { products } = this.props;
    const { productId } = this.props.match.params;
    const productsObj = products.reduce((a, v) => ({...a, [v.id]: {...v}}), {});
    const product = productsObj[productId.toUpperCase()];

    return (
      <div className='edit-product'>
        <input className='edit-product-name' placeholder={`Name: ${product.name}`} required readOnly />
        <input className='edit-product-id' placeholder={`ID: ${product.id}`} required readOnly />
        <input className='edit-product-unit' placeholder={`Unit: ${product.unit}`} required readOnly />
        <input className='edit-product-desc' placeholder={`Description: ${product.desc}`} readOnly />
        <div className='edit-product-split'>
          Split: &nbsp;
          <input type='checkbox' readOnly disabled checked={product.split ? 'checked' : null} />
        </div>
        <div className='edit-product-btns'>
          <button className='edit-product-btns--save'>Save</button>
          <button className='edit-product-btns--delete'>Delete</button>
          <button className='edit-product-btns--cancel'>Cancel</button>
        </div>
      </div>
    );
  }
}

export default withRouter(EditProduct);