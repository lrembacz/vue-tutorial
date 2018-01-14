
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import { sync } from 'vuex-router-sync'
import store from './store'
import { router } from './router'
import { mapGetters, mapActions } from 'vuex'

Vue.component('app', require('./components/App.vue'))
Vue.component('navbar', require('./components/nav/Nav.vue'))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const unsync = sync(store, router);

const app = new Vue({
    el: '#app',
    store,
    router,
});

console.log(app.props);

unsync();
