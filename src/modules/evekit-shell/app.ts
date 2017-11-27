import Vue from 'vue'
import iView from "iview";
import VueRouter from 'vue-router'
import Component from 'vue-class-component'
import {router} from "./app.routing";
import './app.css';
import {LoadingService, AlertService, Service} from 'evekit/core'
import {MenuComponent} from "./components/menu.component";
import {EvekitCore} from 'evekit/core'
@Component({
    template: require("./app.html"),
    components: { MenuComponent}
})
class App extends Vue {
    @Service(LoadingService)
    loadingService:LoadingService;
    @Service(AlertService)
    alertService:AlertService;
    beforeMount() {
        this.loadingService._setLoadingEvent((val) => {
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

    userInfo = {
        userName: "Test",
        img: ""
    } ;

    onSearch() {
        let text=(this.searchText||'').trim();
        if(!text){
            this.bindMenuList=Object.assign([],this.menus);
            return;
        }
        this.bindMenuList=this.menus.filter(p=>p.name.includes(text)) ;
    }

    onLogout() {
          this.alertService.confirm("确认退出?",()=>{
             // window.location.href='login'
          })
    }
}

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(EvekitCore);

new App({
    el: "#app",
    router
});