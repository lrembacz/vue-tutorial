import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import { routes } from './routes'

Vue.use(VueRouter)

let routerMain = new VueRouter({
    routes: routes,
    mode : 'history'
});

export const router = routerMain;
