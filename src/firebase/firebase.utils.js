import firebase from 'firebase';

// import "firebase/analytics";
import 'firebase/firestore';
import 'firebase/auth';

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

export const signIn = async (username, pass) => {
  const userDataObj = await userData();
  let loggedInUser = {}

  console.log(userDataObj)
  console.log(userDataObj[username])

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
  
  console.log(loggedInUser);
  return loggedInUser;
}

// export const signIn = (username, pass) => {
//   const userDataObj = userData().then(x => x);
  
//   const { name, password, role, email } = userDataObj.filter(data => {
//     console.log(data);
//   }) 

//   if (!username || username !== name.toLowerCase() || pass !== password) {
//     return alert ('Invalid username or password')
//   }

//   let loggedInUser;

//   return loggedInUser;
// }

export const signOut = firebase.auth().signOut()
  .then(() => {
    let user = ''
    return user;
  })
  .catch(err => console.err('Error!', err.message));

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
    
    return userDataObj;

  } catch (err) {
    console.log('Error: ', err.message);
  }

  return userDataObj;
}

export default firebase;