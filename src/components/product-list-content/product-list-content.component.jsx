import React from 'react';

class ProductListContent extends React.Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      products: this.props.products,
      quantity: {},
      orderProducts: {},
      setOnOrder: this.props.setOnOrder
    }
  }

  handleInputChange(event, orderedProducts) {
    const { name, id } = orderedProducts;
    const { value } = event.target;

    for (let i in this.state.quantity) {
      if (i === id) {
        delete this.state.quantity[i];
      }
    }

    this.setState({ quantity: {
      [id]: {
        name,
        value,
      },
      ...this.state.quantity
    }})

    for (let i in this.state.orderProducts) {
      if (i === id) {
        delete this.state.orderProducts[i];
      }
    }

    this.setState({ orderProducts: {
      [id]: {
        name,
        value,
      },
      ...this.state.orderProducts
    }}, () => this.state.setOnOrder(this.state.orderProducts));

  }


  render() {
    
  
    const { products, quantity } = this.state;
    
    return (
      <div>
        {
          products.map(el => {
            return (
              <ul className='product-item' key={el.id}>
                <li className='product-item-name'>{el.name}</li>
                <li className='product-item-desc'>{el.desc}</li>
                <li className='product-item-unit'>{el.unit}</li>
                <input type='checkbox' checked={el.split ? 'checked' : ''} readOnly className='product-item-split' />
                <input type='text' className='product-item-quantity' value={quantity[el.id] ? quantity[el.id].value : '0'} onChange={(event) => this.handleInputChange(event, { name: el.name, id: el.id })} />
              </ul>
            )
          })
        } 
      </div>
    );
  }
}

export default ProductListContent;