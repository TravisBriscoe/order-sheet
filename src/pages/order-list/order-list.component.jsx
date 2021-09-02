import React from 'react';

import './order-list.styles.scss';

const OrderListPage = ({ onOrder }) => {
  console.log(onOrder)
  const onOrderObj = Object.entries(onOrder);
  
  return (
    <div className='order-sheet'>
      <h2 className='order-sheet-title'>Order List Page</h2>
      <div className='order-sheet-list'>
      {
        onOrderObj.map(el => {
          return (
              <ul key={el[0]}>
                <li className='order-sheet-list-item'>
                  <div className='order-sheet-list-item--name'>{el[1].name}:</div><input className='order-sheet-list-item--quant' type='text' placeholder={el[1].value} />
                  {/* <button className='order-sheet-list-item--edit_btn'>Edit</button> */}
                  <button className='order-sheet-list-item--remove_btn'>Remove</button>
                </li>
              </ul>
          )
        })
      }
      </div>
      <div className='order-sheet--clear_btn'>
        <button>Clear!</button>
      </div>
    </div>
  );
}


export default OrderListPage;