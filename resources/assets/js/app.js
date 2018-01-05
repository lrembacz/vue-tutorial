
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('posts', require('./components/Posts.vue'));

const app = new Vue({
    el: '#app',

    // Vue instance data
    data : {
        // posts data used in Posts component - passed by props
        posts : [
            {
                title : "Post 1",
                content : "Przykładowy post 1.",
                created_at : "2018-01-04 00:00:00",
                user : {
                    name : "admin"
                }
            },
            {
                title : "Post 2",
                content : "Przykładowy post 2.",
                created_at : "2018-01-04 02:00:00",
                user : {
                    name : "admin"
                }
            },
            {
                title : "Post 3",
                content : "Przykładowy post 3.",
                created_at : "2018-01-04 03:00:00",
                user : {
                    name : "admin"
                }
            },
            {
                title : "Post 4",
                content : "Przykładowy post 4.",
                created_at : "2018-01-05 00:00:00",
                user : {
                    name : "admin"
                }
            },
        ]
    }
});
