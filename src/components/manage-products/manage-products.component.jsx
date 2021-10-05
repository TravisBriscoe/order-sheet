import React from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';

import ProductNav from '../product-nav/product-nav.component';
import EditProduct from '../edit-product/edit-product.component';
import AddProduct from '../add-product/add-product.component';
import withLoading from '../../withLoading';

import './manage-products.styles.scss';

class ManageProducts extends React.Component {
  constructor(props) {
    super(props);

    this.onAddNewProduct = this.onAddNewProduct.bind(this);

    this.state = {
      addNewProduct: false,
    }
  }

  onAddNewProduct(bool) {
    const { pathname } = this.props.location;
    
     if (bool) {
      this.setState((prevState) => ({addNewProduct: !prevState.addNewProduct}), () => {
        if (pathname !== '/manage/edit-products') this.props.history.push('/manage/edit-products')
      });
    } else this.setState({ addNewProduct: false })
  }
  
  // Handles Drops down Menu selection
  onChangeSelect(event) {
    const { value } = event.target;

    this.props.onMenuSelect(value)
  }

  render() {
    // const { sortedProds } = this.state;
    // const { products } = this.props;
  
    return (
      <div className='manage-products'>
          {
            this.props.sortedProds
              ? <div className='manage-products-actions'>
                  <div className='manage-products-actions-btn--new_product'>
                    <button disabled={this.state.addNewProduct ? 'disabled' : ''} onClick={() => this.onAddNewProduct(true)}>Create New Product</button>
                  </div>
                  <div className='manage-products-actions-menu'>
                    <select className='manage-products-actions-menu--category' value={this.props.sortCategory} onChange={(event) => this.onChangeSelect(event) }>
                      <option value="all"> -= ALL =- </option>
                      <option value="">Distributor:</option>
                      <option value="findlays">&nbsp;&nbsp;Findlay</option>
                      <option value="quattrocchis">&nbsp;&nbsp;Quattrocchi's</option>
                      <option value="pigolive">&nbsp;&nbsp;Pig &amp; Olive</option>
                      <option value="">Category:</option>
                      <option value="dairy">&nbsp;&nbsp;Dairy</option>
                      <option value="meat">&nbsp;&nbsp;Meats</option>
                      <option value="produce">&nbsp;&nbsp;Produce</option>
                      <option value="sauces">&nbsp;&nbsp;Sauces &amp; Dressings</option>
                      <option value="spices">&nbsp;&nbsp;Spices</option>
                      <option value="oil">&nbsp;&nbsp;Oil &amp; Vinegar</option>
                      <option value="paper">&nbsp;&nbsp;Paper/Plastic</option>
                      <option value="chemical">&nbsp;&nbsp;Chemicals</option>
                      <option value="bar">&nbsp;&nbsp;Bar</option>
                      <option value="bread">&nbsp;&nbsp;Bread</option>
                      <option value="misc">&nbsp;&nbsp;Misc</option>
                      <option value="user">&nbsp;&nbsp;User Added</option>
                    </select>
                    <input type='text' className='manage-products-actions-menu--search_bar' placeholder='Search by Name or Description' onInput={(event) => this.onChangeSelect(event)} />
                  </div>
                </div>  
              // : <div className='manage-products-actions'>
              //     <div className='manage-products-edit'>
                :    <div className='manage-products-add'>
                      <AddProduct
                        addNewProduct={this.state.addNewProduct}
                        onAddNewProduct={this.onAddNewProduct}
                        onSaveProduct={this.props.onSaveProduct}
                      />
                    </div>
                //   </div>
                // </div>
          }
        <div className='manage-products-list'>
          <ProductNav products={this.props.sortedProds} isLoading={this.props.isLoading} onAddNewProduct={this.onAddNewProduct} />
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

export default withLoading(withRouter(ManageProducts));