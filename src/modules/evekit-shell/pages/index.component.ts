import Vue from 'vue'
import iView from "iview";
import VueRouter from 'vue-router'
import Component from 'vue-class-component'
import {LoadingService, AlertService, Service, EveCookieService, EveAuthService} from 'evekit/core'
import {MenuComponent} from "../components/menu.component";
@Component({
    template: require("./index.component.html"),
    components: { MenuComponent}
})
export  class IndexComponent extends Vue {

    @Service()
    alertService:AlertService;

    @Service()
    cookieService:EveCookieService;

    @Service()
    authService:EveAuthService;
    bindMenuList=[];
    menus= [{
        name: "Dashboard", path: '/',active:true
    }, {
        name: "404", path: '/404',active:false
    }, {
        name: "500", path: '/500',active:false
    },{
        name:"demo",path:"",children:[{
            name:"test1",path:"/demo/test1",active:false
        }]
    }];
    isShowLoading: boolean = false;
    name: string;
    searchText: string = "";

    userInfo = {
        userName: "Test",
        img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
    } ;

    created(){
        this.bindMenuList=Object.assign([],this.menus) ;

    }
    mounted(){

        // $(window).on('load',function () {
        //     let $pushMenu       = $('[data-toggle="push-menu"]').data('lte.pushmenu');
        //
        //     let $layout         = $('body').data('lte.layout');
        //     console.dir($layout);
        //     console.dir($pushMenu)
        // });


        this.authService.authenticate().then(res=>{
            this.userInfo=this.authService.userInfo;
        }).catch(res=>{
            this.$router.replace("/login");
        });
        $(window).resize();
        if(!$('[data-toggle="push-menu"]').data('lte.pushmenu')){
            $(window).trigger('load')
        }

    }


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
            this.cookieService.clearCookie("x-token");
            this.$router.replace("/login");
        })
    }
}