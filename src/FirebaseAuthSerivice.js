import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import app from "./FirebaseConfig"; // Ensure Firebase is initialized in this file

const auth = getAuth(app);

const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
  return signOut(auth);
};

const sendPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthAction) => {
  return onAuthStateChanged(auth, (user) => {
    handleAuthAction(user);
  });
};

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendPasswordReset,
  loginWithGoogle,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
