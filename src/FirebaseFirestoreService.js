import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "./FirebaseConfig";

const firestore = getFirestore(app);

const createDocument = (collectionName, documentData) => {
  return addDoc(collection(firestore, collectionName), documentData);
};


const readDocuments = (collectionName) => {
  return getDocs(collection(firestore, collectionName)).then((querySnapshot) =>
    querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
}; 


const FirebaseFirestoreService = {
  createDocument, 
  readDocuments
};

export default FirebaseFirestoreService;

// import firebase from "./FirebaseConfig";

// const firestore = firebase.firestore();

// const createDocument = (collection, document) => {
//     return firestore.collection(collection).add(document);
// };

// const readDocuments = (collection)=> {
//   return firestore.collection(collection).get()
// }


// const FirebaseFirestoreService = {
//     createDocument,
// };

// export default FirebaseFirestoreService;
