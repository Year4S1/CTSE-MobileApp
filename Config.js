import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {storage} from "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDTOzmI_-BeqToCTus8C3PngbDqO1elBQw",
  authDomain: "ctse-assignment1.firebaseapp.com",
  projectId: "ctse-assignment1",
  storageBucket: "ctse-assignment1.appspot.com",
  messagingSenderId: "148311630175",
  appId: "1:148311630175:web:69206c79c9d6e0197916ea"
  };

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
  export {firebase,storage}