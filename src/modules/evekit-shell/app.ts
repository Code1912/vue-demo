import Vue from 'vue'
import iView from "iview";
import {ContainerComponent} from "./components/index";
import VueRouter from 'vue-router'
import  DashboardComponent  from "./pages/dashboard.component";
import Component from 'vue-class-component'
import './common/es6.extend'
import { router} from "./app.routing";
import './app.css';
import {Error500Component} from "./pages/error500.component";
import {LoadingComponent,loadingService} from 'evekit/core'
@Component({
    template: require("./app.html"),
    components:{LoadingComponent}
})
class  App extends  Vue {

    beforeMount(){
        loadingService._setLoadingEvent((val)=>{
            this.isShowLoading=val;
            console.log(this.isShowLoading)
        })
    }
    isShowLoading:boolean=false;
    name: string;
    searchText:string="";
    // 初始数据可以直接声明为实例的属性
    message: string = 'Hello!';
    userInfo={
        userName:"Test",
        img:""
    };
    onLoading(){

        loadingService.show();
    }
    onSearch(){
        console.log(arguments);
        console.log(router);
        router.addRoutes([{
            path:"/500",
            component:Error500Component
        }])

    }
    onLogout(){

    }
}
Vue.use(iView);
Vue.use(VueRouter);

new App({
    el: "#app",
    router
});