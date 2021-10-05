// UTILS.js file for helper functions

import { users, products, orderlist, recipes } from './firebase/firebase.utils';

export const setCollectionRef = (collectionRef) => {
  if (collectionRef === 'users') collectionRef = users;
  else if (collectionRef === 'products') collectionRef = products;
  else if (collectionRef === 'orderlist') collectionRef = orderlist;
  else collectionRef = recipes;
  
  return collectionRef;
}

export const mapCollectionData = (data) => {
  return data.map(data => data[1])
}

export const utils = { setCollectionRef, mapCollectionData }

export default utils;