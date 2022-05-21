// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDPzjySKkNyuc5DwNhmmbAEhfc6pioN7i8",
//   authDomain: "jvwdk-r.firebaseapp.com",
//   databaseURL: "https://jvwdk-r-default-rtdb.firebaseio.com",
//   projectId: "jvwdk-r",
//   storageBucket: "jvwdk-r.appspot.com",
//   messagingSenderId: "235019622599",
//   appId: "1:235019622599:web:33015ca72629988f9e06e2",
//   measurementId: "G-S5ZYDTL0M1"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCrOQFk5Ou4XAa7IwhZVkXsYwGKCYHIXxk",
  authDomain: "un-jardin-especial.firebaseapp.com",
  projectId: "un-jardin-especial",
  storageBucket: "un-jardin-especial.appspot.com",
  messagingSenderId: "609131016095",
  appId: "1:609131016095:web:e6ded501ee3055475d97aa",
  measurementId: "G-2GD4XGJFQN"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default} ;
