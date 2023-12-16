
import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from '../pages/MainPage.vue'
import About from "../pages/About.vue"
import LoginPage from "../pages/LoginPage.vue"

const routes = [{
    name:'Main',
    path:'/Kanban-board-with-Vue/',
    component:MainPage
},
{
    name:'About',
    path:'/Kanban-board-with-Vue/about',
    component:About
},
{
    name:'Login',
    path:'/Kanban-board-with-Vue/login',
    component:LoginPage
},
]
const router= createRouter({
    history: createWebHashHistory(),
    routes
});
export default router