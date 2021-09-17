import React from 'react';

import { Route, Switch } from 'react-router-dom';

import ProductNav from '../product-nav/product-nav.component';
import EditProduct from '../edit-product/edit-product.component';

import './manage-products.styles.scss';

class ManageProducts extends React.Component {
  // constructor(props) {
  //   super(props);

    // this.onHandleSearch = this.onHandleSearch.bind(this);

    // this.state = {
    //   sortedProds: ''
    // }
  // }

  // onHandleSearch = (e) => {
  //   const searchData = this.props.products.filter((product) => {
  //      return product.name.toLowerCase().includes(e.target.value.toLowerCase());
  //   });

  //   this.setState({ sortedProds: searchData });
  // }

  render() {
    // const { sortedProds } = this.state;
    // const { products } = this.props;
  
    return (
      <div className='manage-products'>
        <div className='manage-products-actions'>
          <div className='manage-products-actions-btn--new_product'>
            <button>Create New Product</button>
          </div>
          <div className='manage-products-actions--search_bar'>
            <input type='text' placeholder='Search by Name' onInput={this.props.onHandleSearch} />
          </div>
        </div>
        <div className='manage-products-list'>
          <ProductNav products={this.props.sortedProds} />
        </div>
        <div className='manage-products-edit'>
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
        </div>
      </div>
    )
  }
}

export default ManageProducts;