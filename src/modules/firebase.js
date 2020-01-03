import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

let config = {
  apiKey: process.env.VUE_APP_KEY,
  authDomain: "cpentrepreneurs-e2e22.firebaseapp.com",
  databaseURL: "https://cpentrepreneurs-e2e22.firebaseio.com",
  projectId: "cpentrepreneurs-e2e22",
  storageBucket: "cpentrepreneurs-e2e22.appspot.com",
  messagingSenderId: "262626193290",
  appId: "1:262626193290:web:ff81c5eff6993b06"
};
console.log("ran firebase file");

firebase.initializeApp(config);
export const db = firebase.firestore();
export const auth = firebase.auth();

export function trackAuthState(auth) {
  // control auth flow
  auth.onAuthStateChanged(function(user) {
    if (user) {
      console.log("TODO: store the user");
    } else {
      router.push("/");
    }
  });
}
