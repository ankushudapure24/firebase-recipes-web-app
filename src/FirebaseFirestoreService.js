import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebase from "./FirebaseConfig";

const firestore = getFirestore(firebase);

const createDocument = (collectionName, documentData) => {
  return addDoc(collection(firestore, collectionName), documentData);
};

const FirebaseFirestoreService = {
  createDocument,
};

export default FirebaseFirestoreService;

// import firebase from "./FirebaseConfig";

// const firestore = firebase.firestore();

// const createDocument = (collection, document) => {
//     return firestore.collection(collection).add(document);
// };

// const FirebaseFirestoreService = {
//     createDocument,
// };

// export default FirebaseFirestoreService;
