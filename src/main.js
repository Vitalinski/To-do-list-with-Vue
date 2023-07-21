import { createApp } from "vue";
import App from "./App.vue";
import router from "@/components/router/router";
import { createPinia } from "pinia";
import styles from "./main.scss"
const pinia = createPinia()

createApp(App).use(router).use(pinia).mount("#app");
