import VueRouter ,{RouteConfig}from 'vue-router';
import DashboardComponent from "./pages/dashboard.component";
import Error404Component from "./pages/error404.component";
import {Error500Component} from "./pages/error500.component";
import {ModuleLoader} from "./common/module.loader";
import {LoadingService} from "evekit/core";
const routes=[
    { path: '/', component: DashboardComponent },
    { path: '/404', component: Error404Component  },
    { path: '/500', component: Error500Component  },
    createRouteConfig('/demo/test1')
];
function  createRouteConfig(path):RouteConfig{
    return  {
        path: path,
        component:()=> {
            return new Promise(res => {
                ModuleLoader.load(path).then(comp => {
                    res(comp)
                });
            });
        }
    };
}
export  const router = new VueRouter({ mode: 'history',routes});
router.beforeEach((to,from,next)=>{
    LoadingService.show();
    next();
});
router.afterEach((to,from)=>{
        LoadingService.hide();
})
