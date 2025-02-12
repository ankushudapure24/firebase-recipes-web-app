import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAAIN,
  projectId: process.env.REACT_APP_DAATABAASE_URL,
  storageBucket: process.env.REACT_APP_PRODUCT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
