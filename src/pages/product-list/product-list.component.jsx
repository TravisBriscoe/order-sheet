import React from 'react';
import AddProduct from '../../components/add-product/add-product.component';
import ProductListContent from '../../components/product-list-content/product-list-content.component';
import ProductListMenu from '../../components/product-list-menu/product-list-menu.component';

import withLoading from '../../withLoading';

import './product-list.styles.scss';

class ProductList extends React.Component {
  constructor(props) {
    super(props)

    this.onNewProduct = this.onNewProduct.bind(this);
    
    this.state = {
      setOnOrder: this.props.setOnOrder,
      onMenuSelect: this.props.onMenuSelect,
      onHandleSearch: this.props.onHandleSearch,
    }
  }

  // Menu
  onChangeInput(event) {
    const { value } = event.target;

    this.state.onMenuSelect(value)
  }

  onNewProduct(event) {
    event.preventDefault();

    this.props.history.push('/manage/edit-products');
  }

  render() {
    const { setOnOrder, onMenuSelect, onHandleSearch } = this.state;
    const { sortedProds } = this.props
    
    return (
      <div className='product-list'>
        {
          sortedProds 
            ? <div className='product-list-content'>
                <ProductListMenu onMenuSelect={onMenuSelect} onHandleSearch={onHandleSearch} sortCategory={this.props.sortCategory} />      
                <ProductListContent sortedProds={sortedProds} setOnOrder={setOnOrder} onOrder={this.props.onOrder} />
              </div>
            // : (<button className='product-list-items--new_product' onClick={this.onNewProduct}>Add New Product</button>)
            : <div className=''>
                <AddProduct onSaveProduct={this.props.onSaveProduct} />
              </div>
        }
      </div>
    );
  }
};

export default withLoading(ProductList);