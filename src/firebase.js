import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCYFkx_79BVjkGdfVJZtrs_rn-ZLFs9hlo",
    authDomain: "todo-93b6a.firebaseapp.com",
    projectId: "todo-93b6a",
    storageBucket: "todo-93b6a.appspot.com",
    messagingSenderId: "585225170566",
    appId: "1:585225170566:web:3345ef2b56f1b1bfa16b07"
}

export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();
  