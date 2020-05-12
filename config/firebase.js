import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2FdxqvTqAt1aPstk4EQv0v3W6J2tFwtk",
  authDomain: "anonibus-23bbf.firebaseapp.com",
  databaseURL: "https://anonibus-23bbf.firebaseio.com",
  projectId: "anonibus-23bbf",
  storageBucket: "anonibus-23bbf.appspot.com",
  messagingSenderId: "72805023943",
  appId: "1:72805023943:web:e19afaafa38be93ea2bee2"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
