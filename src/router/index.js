import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from "../views/Dashboard";
import About from '../views/About';
import NotFound from '../views/NotFound';

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
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ]
});