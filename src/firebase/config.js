// NOTE npm install firebase then do that following
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFdY1DuUKUcXakVGQId2dq4Y2FoHEmpAc",
  authDomain: "thedojo-a522b.firebaseapp.com",
  projectId: "thedojo-a522b",
  storageBucket: "thedojo-a522b.appspot.com",
  messagingSenderId: "352420739802",
  appId: "1:352420739802:web:6f7738990eb7f75f0643e3",
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

const timestamp = firebase.firestore.Timestamp();

export { projectAuth, projectFirestore, timestamp };
