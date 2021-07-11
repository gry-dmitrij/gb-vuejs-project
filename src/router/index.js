import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from "../views/Dashboard";
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
        },
        {
            path: '/add/payment/:category',
            name: 'add',
            component: Dashboard
        },
        {
            path: '/add/payment',
            name: 'addNoParam',
            component: Dashboard
        },
        {
            path: '/',
            name: 'main',
            component: Dashboard,
        },
    ]
});