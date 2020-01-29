import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

let config = {
  apiKey: "AIzaSyAaM7LT7uzctt5FvItXJUK7dJzKprledr4",
  authDomain: "cpe-community.firebaseapp.com",
  databaseURL: "https://cpe-community.firebaseio.com",
  projectId: "cpe-community",
  storageBucket: "cpe-community.appspot.com",
  messagingSenderId: "78585421786",
  appId: "1:78585421786:web:ff643423fa1c154e06aae3",
  measurementId: "G-FRSVXYQ5X8"
};

firebase.initializeApp(config);
export const analytics = firebase.analytics();
export const db = firebase.firestore();
export const auth = firebase.auth();
