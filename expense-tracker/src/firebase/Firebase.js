import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBNorsRApFtx5-ipswB_dFnzEms3hXjApY",
    authDomain: "expense-tracker-dcf73.firebaseapp.com",
    projectId: "expense-tracker-dcf73",
    storageBucket: "expense-tracker-dcf73.appspot.com",
    messagingSenderId: "661953214327",
    appId: "1:661953214327:web:5779a1b3abd8bad7769372",
    measurementId: "G-MFJXHLBFYW",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export {db,auth}