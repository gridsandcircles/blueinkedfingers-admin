import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const fireAppConfig = {
  apiKey: "AIzaSyC0MEm2bHkXZQbTZ2cwL1GMiXmQRLd65F8",
  authDomain: "blueinkedfingers-9963d.firebaseapp.com",
  projectId: "blueinkedfingers-9963d",
  storageBucket: "blueinkedfingers-9963d.appspot.com",
  messagingSenderId: "761390903456",
  appId: "1:761390903456:web:f043b0baf0c951b495d9c5",
};

const fireApp = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(fireAppConfig);

export const fireDb = getFirestore(fireApp);
export const fireStorage = getStorage(fireApp);
export default fireApp;
