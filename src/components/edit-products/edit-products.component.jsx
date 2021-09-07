import React from 'react';

import EditProduct from '../edit-product/edit-products.component';

class EditProducts extends React.Component {
  constructor(props) {
    super(props)

    this.setUseHidden = this.setUseHidden.bind(this);

    this.state = {}
    // eslint-disable-next-line react/no-direct-mutation-state
    this.props.products.forEach(product => this.state[`${product.id}`] = false)
  }

  setUseHidden(product, boo) {
    Object.entries(this.state).forEach(id => {
      if (!id[1]) this.setState({ [product]: boo});
      else {
        const alreadyHidden = id[0];
        this.setState({ [alreadyHidden]: false});
        this.setState({ [product]: boo});
      }
    })
  }

  render() {

    return (
      <div>
        {
          !this.props.products ?
            (<button>Create New Product</button>)
          :
          <div>
            {
              this.props.products.map(product => (
                <div className='edit-products--product-list' key={product.id}>
                  <div className='edit-products--product-name'>{product.name}</div>
                  <button className='edit-products--edit-product' onClick={() => this.setUseHidden(product.id, true)}>Edit Product</button>
                  { this.state[product.id] ? (<EditProduct product={product} setUseHidden={this.setUseHidden} />) : null }
                </div>
              ))
            } 
          </div>
        }
      </div>
    )
  }
}

export default EditProducts;