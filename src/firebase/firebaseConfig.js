import firebase from "firebase/compat/app";
require("firebase/compat/auth");
require("firebase/compat/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDiS4q-H15pHNlCilBf5eJkjqdZJ8iGp5g",
  authDomain: "chat-app-89d67.firebaseapp.com",
  projectId: "chat-app-89d67",
  storageBucket: "chat-app-89d67.appspot.com",
  messagingSenderId: "280546712540",
  appId: "1:280546712540:web:51943856bd9f4dfa53cd19",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const auth = firebase.auth();
export const database = firebase.firestore();
// const analytics = getAnalytics(app);
