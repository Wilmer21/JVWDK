// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLTZuPU0lVdfHXya8tCsaZtJ8S5eLsLAg",
  authDomain: "tiempo-r.firebaseapp.com",
  databaseURL: "https://tiempo-r-default-rtdb.firebaseio.com",
  projectId: "tiempo-r",
  storageBucket: "tiempo-r.appspot.com",
  messagingSenderId: "511666154645",
  appId: "1:511666154645:web:595826f8d42fd9915c7f9c",
  measurementId: "G-B0L55H4656"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default} ;
