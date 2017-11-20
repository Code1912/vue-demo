import Vue from 'vue'
import iView from "iview";
import {ContainerComponent} from "./components/index";
import VueRouter from 'vue-router'
import  DashboardComponent  from "./pages/dashboard.component";
import Component from 'vue-class-component'
import './common/es6-extend'
import './app.css'
@Component({
    template: require("./app.html")
})
class  App extends  Vue {

    name: string;
    searchText:string="";
    // 初始数据可以直接声明为实例的属性
    message: string = 'Hello!';
    userInfo={
        userName:"Test",
        img:""
    }
    name2(){
        return this.name;
    }
    onSearch():void{
        console.log(arguments)
    }
    onLogout(){

    }
    // 组件方法也可以直接声明为实例的方法

    onClick (): void {
        window.alert(this.message);
        //this.$emit()
    }
    beforeRouteEnter () {
        console.log('beforeRouteEnter')
    }

    beforeRouteLeave () {
        console.log('beforeRouteLeave')
    }
}
Vue.use(iView);
Vue.use(VueRouter);
const router = new VueRouter({ routes:[
    { path: '/', component: DashboardComponent },
    { path: '/dashboard', component: DashboardComponent }
]});

new App({
    el: "#app",
    router
});