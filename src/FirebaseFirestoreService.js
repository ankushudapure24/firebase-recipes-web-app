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