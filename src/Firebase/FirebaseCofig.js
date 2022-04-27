import { initializeApp  } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    // Your credentials
    apiKey: "AIzaSyBvTVw7EPTd8TC8ZXr07nM-dGB9uRyzPoo",
    authDomain: "classroommanagementweb.firebaseapp.com",
    projectId: "classroommanagementweb",
    storageBucket: "classroommanagementweb.appspot.com",
    messagingSenderId: "36375639309",
    appId: "1:36375639309:web:9e94fb759a7cc4f6286c44",
    measurementId: "G-NB0X2JZG2K"
};
  
/* firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export {auth , firebase}; */
const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
 const storage = getStorage(app);
 var auth = getAuth(app);
 export { storage, db ,ref ,app,auth};