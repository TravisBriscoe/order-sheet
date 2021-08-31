import React from 'react';

class ProductListContent extends React.Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      quantity: {},
      orderProducts: {},
      setOnOrder: this.props.setOnOrder,
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
    
    const { quantity } = this.state;
    const { sortedProds } = this.props;
    
    return (
      <div>
        {
          Object.entries(sortedProds).map(el => {
            return (
              <ul className='product-item' key={el[1].id}>
                <li className='product-item-name'>{el[1].name}</li>
                <li className='product-item-desc'>{el[1].desc}</li>
                <li className='product-item-unit'>{el[1].unit}</li>
                <input type='checkbox' checked={el[1].split ? 'checked' : ''} readOnly className='product-item-split' />
                <input type='text' className='product-item-quantity' placeholder='0' value={quantity[el[1].id] ? quantity[el[1].id].value : ''} onChange={(event) => this.handleInputChange(event, { name: el[1].name, id: el[1].id })} />
              </ul>
            )
          })
        } 
      </div>
    );
  }
}

export default ProductListContent;