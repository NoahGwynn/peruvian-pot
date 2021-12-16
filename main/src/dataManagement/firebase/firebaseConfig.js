import firebase from "firebase/compat";
import "firebase/firestore"
import "firebase/auth"
import "firebase/analytics"
import "firebase/storage"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2xhGHsHpZPiemhPXwWKfLPr7NoAg8pmw",
    authDomain: "my-website-56acd.firebaseapp.com",
    databaseURL: "https://my-website-56acd.firebaseio.com",
    projectId: "my-website-56acd",
    storageBucket: "my-website-56acd.appspot.com",
    messagingSenderId: "823530474359",
    appId: "1:823530474359:web:6c11960c316dfcd9a66f72",
    measurementId: "G-VP4TV39EPJ"
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
firebase.analytics();
firebase.firestore();

export const storage = firebase.storage();
export const db = firebase.firestore();

export default firebase
