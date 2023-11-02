
import { createRouter, createWebHistory } from "vue-router";
import MainPage from '../pages/MainPage.vue'
import About from "../pages/About.vue"
import LoginPage from "../pages/LoginPage.vue"

const routes = [{
    name:'Main',
    path:'/',
    component:MainPage
},
{
    name:'About',
    path:'/about',
    component:About
},
{
    name:'Login',
    path:'/login',
    component:LoginPage
},
]
const router= createRouter({
    history: createWebHistory(),
    routes
});
export default router