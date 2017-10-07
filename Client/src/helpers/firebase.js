import firebase from "firebase";

const config = {
  apiKey: "AIzaSyA27cRAIaX6NqiLQ4_AHNB91MlHajiTplA",
  authDomain: "myhouse-a01c7.firebaseapp.com",
  databaseURL: "https://myhouse-a01c7.firebaseio.com",
  projectId: "myhouse-a01c7",
  storageBucket: "myhouse-a01c7.appspot.com",
  messagingSenderId: "1081028595369"
};

const firebaseApp = firebase.initializeApp(config);

const auth = firebaseApp.auth();

export default auth;

export const isAuthenticated = () => {
  return !!auth.currentUser;
};
