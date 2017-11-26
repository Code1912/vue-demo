import Vue from 'vue'
import iView from "iview";
import VueRouter from 'vue-router'
import Component from 'vue-class-component'
import './common/es6.extend'
import {router} from "./app.routing";
import './app.css';
import { LoadingService,  AlertService} from 'evekit/core'
import {MenuComponent} from "./components/menu.component";
import {EvekitCore} from 'evekit/core'
@Component({
    template: require("./app.html"),
    components: { MenuComponent}
})
class App extends Vue {
    beforeMount() {
        LoadingService._setLoadingEvent((val) => {
            this.isShowLoading = val;
            // console.log(this.isShowLoading)
        });
        this.bindMenuList=Object.assign([],this.menus);
    }

    bindMenuList=[];
    menus= [{
        name: "Dashboard", path: '/'
    }, {
        name: "404", path: '/404'
    }, {
        name: "500", path: '/500'
    },{
        name:"demo",path:"",children:[{
            name:"test1",path:"/demo/test1"
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

        let text=(this.searchText||'').trim()
        if(!text){
            this.bindMenuList=Object.assign([],this.menus);
            return;
        }
        this.bindMenuList=this.menus.filter(p=>p.name.includes(text)) ;
    }

    onLogout() {

    }
}

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(EvekitCore);

new App({
    el: "#app",
    router
});