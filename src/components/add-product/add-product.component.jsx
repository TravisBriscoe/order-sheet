import React from 'react';

import './add-product.styles.scss';

class AddProduct extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newProduct: {
        name: '',
        desc: '',
        unit: '',
        id: '',
        dist: '',
        stored: '',
        category: '',
        split: false,
      }
    }
  }

  render() {
    return (
      <div className='add-product'>
        <h3>Add A New Product!</h3>
        <form className='add-product-form'>
        <input className='add-product-form-id' name='id' placeholder={`ID:`} readOnly />
        <input className='add-product-form-name' name='name' placeholder={`Name:`} readOnly />
        <input className='add-product-form-unit' name='unit' placeholder={`Unit:`} readOnly />
        <input className='add-product-form-desc' name='desc' placeholder={`Description:`} readOnly />
        <input className='add-product-form-dist' name='dist' placeholder={`Distributor:`} readOnly />
        <input className='add-product-form-cat' name='category' placeholder={`Category:`} readOnly />
        <input className='add-product-form-stored' name='stored' placeholder={`Storage:`} readOnly />
        <div className='add-product-form-split'>
          Split? &nbsp;
          <input type='checkbox' name='split' readOnly />
        </div>
        <div className='add-product-form-btns'>
          <button className='add-product-form-btns--save'>Save</button>
          <button className='add-product-form--btns--cancel' onClick={this.props.onAddNewProduct}>Cancel</button>
        </div>
        </form>
      </div>
    )
  }
}

export default AddProduct;