import Vue from 'vue'
import iView from "iview";
import {ContainerComponent} from "./components/index";
import VueRouter from 'vue-router'
import DashboardComponent from "./pages/dashboard.component";
import Component from 'vue-class-component'
import './common/es6.extend'
import {router} from "./app.routing";
import './app.css';
import {Error500Component} from "./pages/error500.component";
import {LoadingComponent, LoadingService, HttpService, AlertService} from 'evekit/core'
import {MenuComponent} from "./components/menu.component";

@Component({
    template: require("./app.html"),
    components: {LoadingComponent,MenuComponent}
})
class App extends Vue {
    beforeMount() {
        LoadingService._setLoadingEvent((val) => {
            this.isShowLoading = val;
            // console.log(this.isShowLoading)
        })
    }

    menus= [{
        name: "Dashboard", path: '/'
    }, {
        name: "404", path: '/404'
    }, {
        name: "500", path: '/500'
    },{
        name:"demo",path:"",children:[{
            name:"demo",path:"/demo/test1"
        }]
    }];
    isShowLoading: boolean = false;
    name: string;
    searchText: string = "";
    // 初始数据可以直接声明为实例的属性
    message: string = 'Hello!';
    userInfo = {
        userName: "Test",
        img: ""
    };

    onLoading() {

        AlertService.confirm("hahaha", () => {
            AlertService.confirm("fffffffffff", () => {
                console.log(this.userInfo)
            }, () => {

            });
        }, () => {

        });
        //
        // HttpService.get("http://localhost:3000/sdfsdfsdf.sdfsdfs").then(res=>{
        //     console.log("ok")
        // },res=>{
        //     console.log("rej")
        // }).catch(erro=>{
        //     console.log("erro")
        // })
    }

    onSearch() {
        console.log(arguments);
        console.log(router);


    }

    onLogout() {

    }
}

Vue.use(iView);
Vue.use(VueRouter);

new App({
    el: "#app",
    router
});