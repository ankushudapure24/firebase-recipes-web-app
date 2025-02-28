import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
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
const updateDocument = (collection, id, document) => {
  const docRef = doc(firestore, collection, id);
  return updateDoc(docRef, document);
};

const deleteDocument = (collection, id) => {
  const docRef = doc(firestore, collection, id);
  return deleteDoc(docRef);
};


// const updateDocument = (collection, id, document) => {
//   return firestore.collection(collection).doc(id).update(document);
// }



const FirebaseFirestoreService = {
  createDocument, 
  readDocuments,
  updateDocument,
  deleteDocument
};

export default FirebaseFirestoreService;