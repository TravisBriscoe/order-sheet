import React from 'react';

import { Route, Switch } from 'react-router-dom';

import ProductNav from '../product-nav/product-nav.component';
import EditProduct from '../edit-product/edit-product.component';
import AddProduct from '../add-product/add-product.component';

import './manage-products.styles.scss';

class ManageProducts extends React.Component {
  constructor(props) {
    super(props);

    this.onAddNewProduct = this.onAddNewProduct.bind(this);

    this.state = {
      addNewProduct: false,
    }
  }

  onAddNewProduct() {
    this.setState((prevState) => ({addNewProduct: !prevState.addNewProduct}), () => this.props.history.push('/manage/edit-products'));
  }

  render() {
    // const { sortedProds } = this.state;
    // const { products } = this.props;
  
    return (
      <div className='manage-products'>
        <div className='manage-products-actions'>
          <div className='manage-products-actions-btn--new_product'>
            <button disabled={this.state.addNewProduct ? 'disabled' : ''} onClick={this.onAddNewProduct}>Create New Product</button>
          </div>
          <div className='manage-products-actions--search_bar'>
            <input type='text' placeholder='Search by Name or Description' onInput={this.props.onHandleSearch} />
          </div>
        </div>
        <div className='manage-products-list'>
          <ProductNav products={this.props.sortedProds} />
        </div>
        <div className='manage-products-edit'>
          {
            !this.state.addNewProduct ?
              <Switch>
                <Route path='/manage/edit-products/:productId'>
                  <EditProduct
                    products={this.props.products}
                    onUpdateEntry={this.props.onUpdateEntry}
                    onDeleteEntry={this.props.onDeleteEntry}
                    onNewEntry={this.props.onNewEntry}
                  />
                </Route>
              </Switch>
            :
              (<div className='manage-products-add'>
                <AddProduct
                  addNewProduct={this.state.addNewProduct}
                  onAddNewProduct={this.onAddNewProduct}
                  onSaveProduct={this.props.onSaveProduct}
                />
              </div>)
          }
        </div>
      </div>
    )
  }
}

export default ManageProducts;