import Posts from '../components/posts/Posts.vue'

export const routes = [
    {
        path : '/',
        component: Posts,
        name : "Strona główna",
    },
    {
        path : '/posts',
        component: Posts,
        name : "Posts",
        props : true,
        meta: { requiresAuth: true }
    },
];