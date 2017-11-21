import VueRouter from 'vue-router';
import DashboardComponent from "./pages/dashboard.component";
import Error404Component from "./pages/error404.component";
import {Error500Component} from "./pages/error500.component";
const routes=[
    { path: '/', component: DashboardComponent },
    { path: '/404', component: Error404Component,children:[
        {
            path: '/404/500', component: Error500Component
        }
    ] }
];
export  const router = new VueRouter({ mode: 'history',routes});