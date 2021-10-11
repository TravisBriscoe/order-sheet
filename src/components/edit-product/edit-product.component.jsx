import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { deleteProduct, editProduct } from '../../features/products';

import './edit-product.styles.scss';

class EditProduct extends React.Component {
  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);

    this.state = {
      editProduct: {
        data: {
          id: '',
        }
      }
    }
  }

  // Function to capitalize first letters in placeholders
  capitalizeFirstLetter(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  // handles input values for all input fields
  onHandleInput(e, { id }) {
    let { value, name } = e.target;

    // Removes capital letters on all fields except Desc and Name fields
    if (name !== 'name' && name !== 'desc') value = value.toLowerCase();
    // Removes the apostrophes from distributors input
    if (name === 'dist' && value.includes('\'')) { let chars = value.split('\''); value = chars[0] + chars[1]; console.log(value); }
    // Changes the split field into a checkbox so the value of true or false gets pushed to state.
    if (name === 'split') value = e.target.checked

    // Sets the state of the edited product (needs work, can edit multiple products, should clear if clicked away from current product)
    this.setState((prevState) => (
      {
        editProduct: {
          ...prevState.editProduct,
          data: {
            ...prevState.editProduct.data,
            id,
            [name]: value,
          }
        }
      }
    ))
  }

  // onSubmit function for saving any edited data, will update firebase entry.
  onUpdateProduct(event, data) {
    event.preventDefault();

    this.props.onUpdate(data);
  }

  // Creates new product (not implemented yet)
  onNewProduct(event, data) {
    event.preventDefault();

    this.props.onNewEntry('products', data);
  }

  onDeleteProduct(event, data) {
    event.preventDefault();
    
    this.props.onDelete(data);
    this.props.history.push('/manage/edit-products');
  }

  onCancel(event) {
    event.preventDefault();

    this.props.history.push('/manage/edit-products');
  }

  render() {
    const { products } = this.props;
    const { productId } = this.props.match.params;
    const productsObj = products.reduce((a, v) => ({...a, [v.id]: {...v}}), {});
    const product = productsObj[productId.toUpperCase()];

    return (
      <form className='edit-product' onSubmit={(event) => {this.onUpdateProduct(event, this.state.editProduct)}}>
        <input className='edit-product-id' name='id' placeholder={`ID: ${product.id}`} readOnly />
        <input className='edit-product-name' name='name' placeholder={`Name: ${this.capitalizeFirstLetter(product.name)}`} onInput={(event) => this.onHandleInput(event, product)} />
        <input className='edit-product-unit' name='unit' placeholder={`Unit: ${product.unit}`} onInput={(event) => this.onHandleInput(event, product)} />
        <input className='edit-product-desc' name='desc' placeholder={`Description: ${this.capitalizeFirstLetter(product.desc)}`} onInput={(event) => this.onHandleInput(event, product)} />
        <input className='edit-product-dist' name='dist' placeholder={`Distributor: ${this.capitalizeFirstLetter(product.dist)}`} onInput={(event) => this.onHandleInput(event, product)} />
        <input className='edit-product-cat' name='category' placeholder={`Category: ${this.capitalizeFirstLetter(product.category)}`} onInput={(event) => this.onHandleInput(event, product)} />
        <input className='edit-product-stored' name='stored' placeholder={`Storage: ${this.capitalizeFirstLetter(product.stored)}`} onInput={(event) => this.onHandleInput(event, product)} />
        <div className='edit-product-split'>
          Split? &nbsp;
          <input type='checkbox' name='split' onChange={(event) => this.onHandleInput(event, product)} defaultChecked={product.split ? 'checked' : null} />
        </div>
        <div className='edit-product-btns'>
          <input type='submit' className='edit-product-btns--save' value='Save' />
          <button className='edit-product-btns--delete' onClick={(event) => this.onDeleteProduct(event, product)}>Delete</button>
          <button className='edit-product-btns--cancel' onClick={this.onCancel}>Cancel</button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onDelete: (data) => dispatch(deleteProduct(data)),
  onUpdate: (data) => dispatch(editProduct(data))
})

export default connect(null, mapDispatchToProps)(withRouter(EditProduct));