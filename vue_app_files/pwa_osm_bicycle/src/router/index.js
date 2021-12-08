import Vue from 'vue'
//import VueRouter from 'vue-router'
import { IonicVueRouter } from '@ionic/vue';
import Home from '../views/Home.vue'
import TilesVector from '../views/TilesVector.vue'
import Callback from '../views/Callback.vue'
import NotAuthorized from '../views/NotAuthorized.vue'
import Profile from "../views/Profile.vue"
import { authGuard } from "../utils/authGuard";


Vue.use(IonicVueRouter)

/*function authCheck(to, from, next){
  if(!isLogged()){
    next({
      path: '/notauthorized'
    });
  }else{
    next();
  }
}*/

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mytiles',
    name: 'TilesVector',
    //beforeEnter: authCheck,
    component: TilesVector,
    beforeEnter: authGuard
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  },
  {
    path: "/notauthorized",
    name: "NotAuthorized",
    component: NotAuthorized,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard
  }
]

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
