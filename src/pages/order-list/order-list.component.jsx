import React from 'react';

import './order-list.styles.scss';

const OrderListPage = ({ onOrder }) => {
  console.log(onOrder)
  const onOrderObj = Object.entries(onOrder);
  
  return (
    <div className='order-sheet'>
      <h2>Order List Page</h2>
      {
        onOrderObj.map(el => {
          console.log(el[0])
          return (
            <div className='order-sheet-list' key={el[0]}>
              <ul>
                <li>
                  {el[1].name}: {el[1].value}
                  <button>Edit</button>
                  <button>Remove</button>
                </li>
              </ul>
            </div>
          )
        })
      }
      <div className='order-sheet--clear_btn'>
        <button>Clear!</button>
      </div>
    </div>
  );
}


export default OrderListPage;