/**
 * Product List
 * Class Component
 * Handles Order Sheet state propogated from Root
 * Uses: withLoading(custom HoC)
 * Imported Components: AddProduct, ProductListConent, ProductListMenu
 * State: setOnOrder(), onMenuSelect(), onHandleSearch()
 * Props: setOnOrder(), onMenuSelect(), onHandleSearch(), onSaveProduct(), sortedProds, onOrder
 * Hooks: None
 * Functions: onChangeInput()
*/

import React from 'react';

import AddProduct from '../../components/add-product/add-product.component';
import ProductListContent from '../../components/product-list-content/product-list-content.component';
import ProductListMenu from '../../components/product-list-menu/product-list-menu.component';

import withLoading from '../../withLoading';

import './product-list.styles.scss';

class ProductList extends React.Component {
  constructor(props) {
    super(props)

    // this.onNewProduct = this.onNewProduct.bind(this);
    
    this.state = {
      setOnOrder: this.props.setOnOrder,
      onMenuSelect: this.props.onMenuSelect,
      onHandleSearch: this.props.onHandleSearch,
    }
  }

  // Drop down menu selection and setState from props
  onChangeInput(event) {
    const { value } = event.target;

    this.state.onMenuSelect(value)
  }

  // ?? - Doesn't look to be relevent or used.
  // onNewProduct(event) {
  //   event.preventDefault();

  //   this.props.history.push('/manage/edit-products');
  // }

  render() {
    const { setOnOrder, onMenuSelect, onHandleSearch, sortCategory } = this.state;
    const { sortedProds, onOrder } = this.props
    
    return (
      <div className='product-list'>
        {
          sortedProds
            ? <div className='product-list-content'>
                <ProductListMenu onMenuSelect={onMenuSelect} onHandleSearch={onHandleSearch} sortCategory={sortCategory} />
                <ProductListContent sortedProds={sortedProds} setOnOrder={setOnOrder} onOrder={onOrder} />
              </div>
            : <div className='product-list--new-product'>
                <AddProduct onSaveProduct={this.props.onSaveProduct} />
              </div>
        }
      </div>
    );
  }
};

export default withLoading(ProductList);