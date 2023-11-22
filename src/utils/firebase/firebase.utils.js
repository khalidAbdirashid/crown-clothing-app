import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_h5sE-bUs_bBzemXUx-y18DQgNG_GIIQ",
  authDomain: "crown-clothing-35ecc.firebaseapp.com",
  projectId: "crown-clothing-35ecc",
  storageBucket: "crown-clothing-35ecc.appspot.com",
  messagingSenderId: "455562313245",
  appId: "1:455562313245:web:4c206a6a07a8975b15d0f4",
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

const auth = getAuth(app);

const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);

const db = getFirestore();

const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((accummulator, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    accummulator[title.toLowerCase()] = items;
    return accummulator;
  }, {});

  return categoryMap;
};
const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error in creating the user", error.message);
    }
  }
  return userDocRef;
};

const createAuthUserFromEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

const signOutUser = () => signOut(auth);
export {
  auth,
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  createAuthUserFromEmailAndPassword,
  signInUserWithEmailAndPassword,
  onAuthStateChangedListener,
  signOutUser,
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
};
