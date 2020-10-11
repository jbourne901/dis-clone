import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDuCg8Q3kNptOfuGkVaq2LHHvRSASm1s8I",
    authDomain: "dis-clone.firebaseapp.com",
    databaseURL: "https://dis-clone.firebaseio.com",
    projectId: "dis-clone",
    storageBucket: "dis-clone.appspot.com",
    messagingSenderId: "1088455698844",
    appId: "1:1088455698844:web:673ac652605c70ec81c059"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export type IDocs = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[];
