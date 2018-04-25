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
    isShowLoading: boolean = false;
    @Service()
    loadingService:LoadingService;
    beforeMount() {
        this.loadingService._setLoadingEvent((val) => {
            this.isShowLoading = val;
            // console.log(this.isShowLoading)
        });
    }


}
Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate' // for vue-router 2.2+
])
Vue.use(iView);
Vue.use(VueRouter);
Vue.use(EvekitCore);

new App({
    el: "#app",
    router
});
