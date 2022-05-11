import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAYdnVAxJ5vBD_8onp5xJcbEwhVIwSxwls",
  authDomain: "rn-instagram-clone-c75db.firebaseapp.com",
  projectId: "rn-instagram-clone-c75db",
  storageBucket: "rn-instagram-clone-c75db.appspot.com",
  messagingSenderId: "483553111029",
  appId: "1:483553111029:web:1a34c336208bda40eb0ebc"
};


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
firebase.firestore().settings({ experimentalForceLongPolling: true, merge:true });

const db = firebase.firestore()

export {firebase, db}
