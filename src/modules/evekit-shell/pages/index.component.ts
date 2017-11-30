import Vue from 'vue'
import iView from "iview";
import VueRouter from 'vue-router'
import Component from 'vue-class-component'
import {LoadingService, AlertService, Service, EveCookieService, EveAuthService, EveEventService} from 'evekit/core'
import {MenuComponent, MenuItem, MenuItemClickEventName} from "../components/menu.component";
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

    @Service()
    eventService: EveEventService;

    bindMenuList=[];
    menus= [{
        name: "Dashboard", path: '/',active:false,children:[]
    }, {
        name: "404", path: '/404',active:false,children:[]
    }, {
        name: "500", path: '/500',active:false,children:[]
    },{
        name:"demo",path:"", active:false,children:[{
            name:"test1",path:"/demo/test1",active:false,children:[{
                name:"test1/test1",path:"/demo/test1",active:false,children:[]
            }]
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


    setParentActive(menuItem:MenuItem){

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
        this.bindMenuList=this.menus.filter(p=>this.findItem(p,text)) ;
    }

    findItem(item,text:string){
         return item.name.includes(text)||item.children.some(p=>{
             return this.findItem(p,text);
         })
    }

    onLogout() {
        this.alertService.confirm("确认退出?",()=>{
            this.cookieService.clearCookie("x-token");
            this.$router.replace("/login");
        })
    }
}