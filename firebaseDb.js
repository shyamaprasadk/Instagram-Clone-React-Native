import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDJGu7lKDhT_814h6knSywewLiM-XhzEGQ",
  authDomain: "rn-instagram-clone-cec70.firebaseapp.com",
  projectId: "rn-instagram-clone-cec70",
  storageBucket: "rn-instagram-clone-cec70.appspot.com",
  messagingSenderId: "55953734273",
  appId: "1:55953734273:web:42f7c7670819cf7dedab80"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

// const fir = initializeApp(firebaseConfig);

export default firebase