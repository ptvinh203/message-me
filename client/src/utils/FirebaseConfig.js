import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC5e0GkZcEK7xsEc_9l71U3zOqNKbm6shU",
    authDomain: "whatapp-clone-5aeb0.firebaseapp.com",
    projectId: "whatapp-clone-5aeb0",
    storageBucket: "whatapp-clone-5aeb0.appspot.com",
    messagingSenderId: "699575990872",
    appId: "1:699575990872:web:a0755e448735aca8fda82d",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
