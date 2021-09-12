import React from 'react';

import './order-list.styles.scss';

const OrderListPage = (props) => {
  const { onOrder, deleteAllData } = props;
  let onOrderObj;
  onOrderObj = onOrder ? onOrderObj = Object.entries(onOrder) : null;
  
  return (
    <div className='order-sheet'>
      <h2 className='order-sheet-title'>Order List Page</h2>
      <div className='order-sheet-list'>
      {
        onOrderObj === null || onOrderObj.length <= 0  ?
          (<h3>No products! Please go to the product list and add some for the next order.</h3>)
        :
          onOrderObj.splice(0).map((el) => {
            return (
                <ul key={el}>
                  <li className='order-sheet-list-item'>
                    <div className='order-sheet-list-item--name'>{el[1].data.name}:</div><input className='order-sheet-list-item--quant' type='text' placeholder={el[1].data.value} />
                    
                    <button className='order-sheet-list-item--remove_btn'>Remove</button>
                  </li>
                </ul>
            )
          })
      }
      </div>
      <div className='order-sheet--clear_btn'>
        <button onClick={() => deleteAllData('orderlist', 'onOrder')}>Clear!</button>
      </div>
    </div>
  );
}


export default OrderListPage;