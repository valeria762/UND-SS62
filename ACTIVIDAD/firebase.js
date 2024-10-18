// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  import { getFirestore, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCCPWL46zQSdHqJTbryvzHbKZ4WCRb7HPE",
    authDomain: "login-p-a771a.firebaseapp.com",
    projectId: "login-p-a771a",
    storageBucket: "login-p-a771a.appspot.com",
    messagingSenderId: "773498899926",
    appId: "1:773498899926:web:1a650e4a5270194380e877",
    measurementId: "G-LB8BXC0RPF"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const Auth = getAuth(app)
  export const db = getFirestore(app);

  //Guardar post 
  export const savePost = (title, description, userMail) => {
     addDoc(collection(db, "posts"),{title, description, userMail});
  }

  // Obtener todos los Post
  export const getPost = () => getDocs(collection(db, "posts"))