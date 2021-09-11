import firebase from 'firebase/app';

// import "firebase/analytics";
import 'firebase/firestore';
import 'firebase/auth';

import PRODUCT_DATA from '../data/product.data';
import RECIPE_DATA from '../data/recipe.list';
import USER_DATA from '../data/user.data';

const firebaseConfig = {
  apiKey: "AIzaSyBhlBXhSRTzKYU3i8sGcxxiBDYnp8R9Em4",
  authDomain: "order-sheet-42332.firebaseapp.com",
  projectId: "order-sheet-42332",
  storageBucket: "order-sheet-42332.appspot.com",
  messagingSenderId: "247627559502",
  appId: "1:247627559502:web:b4f006d2635bda0acf091f",
  measurementId: "G-CTR054S22F"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const users = firestore.collection('user-list');
export const recipes = firestore.collection('recipe-list');
export const products = firestore.collection('product-list');

export const signIn = async (username, pass) => {
  const userDataObj = await userData();
  const myStorage = window.localStorage;
  username = username.toLowerCase();
  let loggedInUser = {}
  const serverUsername = userDataObj[username].name.toLowerCase();
  
  if (serverUsername && userDataObj[username].password === pass) {
    loggedInUser = {
      ...userDataObj[username]
    }
  
    myStorage.setItem("name", `${loggedInUser.name}`);
  } else {
    myStorage.clear();
    loggedInUser = null
  }
  
  return loggedInUser;
}

// export const signOut = firebase.auth().signOut()
//   .then(() => {
//     let user = ''
//     return user;
//   })
//   .catch(err => console.err('Error!', err.message));

export const userData = async () => {
  const userDataObj = Object.create({});
  
  try {
    await users.get().then(snapshot => snapshot.docs.map(doc => {
      const { name } = doc.data();


      userDataObj[name] = {
        ...doc.data()
      }

      return userDataObj;
    }));
  } catch (err) {
    console.log('Error! ', err.message)
  }
  
  return userDataObj;
}

export const recipeData = async () => {
  const recipeDataObj = Object.create({});

  await recipes.get().then(snapshot => snapshot.docs.map(doc => {
    const { linkUrl } = doc.data();

    recipeDataObj[linkUrl] = {
      ...doc.data()
    }

    return recipeDataObj;
  }))
  
  return recipeDataObj;
}

export const productData = async () => {
  const productDataObj = Object.create({})
  
  try {
    await products.get().then(snapshot => snapshot.docs.map(doc => {
      const { id } = doc.data();


      productDataObj[id] = {
        ...doc.data()
      }

      return productDataObj;
    }));
  } catch (err) {
    console.log('Error! ', err.message)
  }
  
  return productDataObj;
}

// CRUD ops

// New entry
export const addNewEntry = async (collectionRef, data) => {
  try {
    await [collectionRef].doc(data.id).set([...data]);
  } catch (err) {
    console.log('Error! ', err.message)
  }
};
// Update entry
export const updateEntry = async (collectionRef, data) => {
  try {
    await collectionRef.doc(data.data.id).update({...data.data});
  } catch (err) {
    console.log('Error! ', err.message)
  }
};
// Delete entry
export const deleteEntry = async (collectionRef, data) => {
  const { id } = data;

  await [collectionRef].doc(id).delete();
};
// End CRUD

// Add data (all) to firebase.
const inputDataToFirebase = async () => {
  const batch = firestore.batch();

  Object.entries(PRODUCT_DATA).map((key) => {
    const { id } = key[1];
    const productListDoc = products.doc(id);
    return batch.set(productListDoc, key[1]);
  })

  Object.entries(RECIPE_DATA).map((key) => {
    const { id } = key[1];
    const recipeListDoc = recipes.doc(id);
    return batch.set(recipeListDoc, key[1]);
  })

  Object.entries(USER_DATA).map((key) => {
    const { id } = key[1];
    const userListDoc = users.doc(id);
    return batch.set(userListDoc, key[1]);
  })

  return await batch.commit();
}

inputDataToFirebase();

export default firebase;