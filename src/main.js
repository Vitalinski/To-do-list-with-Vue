
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import styles from "./main.scss"
import {  initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,} from 'firebase/firestore';


const pinia = createPinia()


const firebaseConfig = {
    apiKey:  VITE_FIREBASE_API_KEY,
    authDomain:  VITE_FIREBASE_AUTH_DOMAIN,
    projectId:  VITE_FIREBASE_PROJECT_ID,
    storageBucket:  VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId:  VITE_FIREBASE_APP_ID,
    measurementId: VITE_FIREBASE_Measurement_ID, 
  };
  let vueApp
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);



getAuth(app).onAuthStateChanged(()=>{
    if(!vueApp){

    vueApp = createApp(App).use(router).use(pinia).mount("#app");
    }
})

export{
  db
}