
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import styles from "./main.scss"
import {  initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,} from 'firebase/firestore';

import { I18nD, createI18n, useI18n } from "vue-i18n";
import { languages } from "./i18n/I18n";
import { defaultLocale } from "./i18n/I18n";


const messages = Object.assign(languages)
const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale:'en',
  messages,

})
const pinia = createPinia()


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, 
  };

  let vueApp
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);



getAuth(app).onAuthStateChanged(()=>{
    if(!vueApp){

    vueApp = createApp(App, {
      setup(){
        const {t} = useI18n()
        return {t}
      }
    }).use(i18n).use(router).use(pinia).mount("#app");
    }
})

export{
  db
}