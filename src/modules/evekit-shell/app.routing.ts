import VueRouter, {RouteConfig} from 'vue-router';
import DashboardComponent from "./pages/dashboard.component";
import Error404Component from "./pages/error404.component";
import {Error500Component} from "./pages/error500.component";
import {ModuleLoader} from "./common/module.loader";
import {EveCookieService, LoadingService} from "evekit/core";
import {IndexComponent} from "./pages/index.component";
import {LoginComponent} from "./pages/login.component";

const routes = [

    {path: '/login', component: LoginComponent},
    {
        path: '',
        component: IndexComponent,
        children: [
            {path: '/404', component: Error404Component},
            {path: '/500', component: Error500Component},
            {path: '/', component: DashboardComponent},
            createRouteConfig('/demo/test1'),
            {path: '/*', component: Error404Component},
        ]
    }

];

function createRouteConfig(path): RouteConfig {
    return {
        path: path,
        component: () => {
            return new Promise(res => {
                ModuleLoader.load(path).then(comp => {
                    res(comp)
                });
            });
        }
    };
}

export const router = new VueRouter({mode: 'history', routes});
router.beforeEach((to, from, next) => {
    LoadingService.instance<LoadingService>().show();
    if(to.path!="/login"&&!EveCookieService.instance<EveCookieService>().getCookie("x-token")){
        router.replace("/login");
        return ;
    }
    next();
});
router.afterEach((to, from) => {
    LoadingService.instance<LoadingService>().hide();
    if(to.path=="/login"){
        document.body.className="hold-transition login-page";
    }
    else {
        if( document.body.className!=="hold-transition skin-blue sidebar-mini"){
            document.body.className="hold-transition skin-blue sidebar-mini";
        }
    }
})
