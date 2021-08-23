import firebase from 'firebase/app';

// import "firebase/analytics";
import 'firebase/firestore';
import 'firebase/auth';
// import RECIPE_DATA from '../data/recipe.list';

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

export const users = firestore.collection('users');
export const recipes = firestore.collection('recipe-list');

export const signIn = async (username, pass) => {
  const userDataObj = await userData();
  username = username.toLowerCase();
  let loggedInUser = {}

  if (userDataObj[username.toLowerCase()] && userDataObj[username.toLowerCase()].password === pass) {
    loggedInUser = {
      isUserLoggedIn: true,
      ...userDataObj[username]
    }
  } else {
    loggedInUser = {
      isUserLoggedIn: false,
    }
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

// Add data (recipes) to firebase.
// const inputDataToFirebase = async () => {
//   const batch = firestore.batch();

//   Object.entries(RECIPE_DATA).map((key) => {
//     const { linkUrl } = key[1];
//     const recipeListDoc = recipes.doc(linkUrl);
//     batch.set(recipeListDoc, key[1]);    
//   })

//   return await batch.commit();
// }

// inputDataToFirebase();

export default firebase;