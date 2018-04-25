import Vue from 'vue'
import {EveCookieService, HttpService, ViewChild, Service, EveAuthService} from "evekit/core";
import Component from 'vue-class-component'

@Component({
    template: require('./login.component.html')
})
export class LoginComponent extends Vue {
    userInfo = {
        userName: "",
        pwd: ''
    };
    rememberMe: boolean = false;

    @ViewChild("loginForm")
    loginForm:HTMLFormElement;

    @Service()
    authService:EveAuthService;
    public login($event: MouseEvent) {
        this.authService.login(this.userInfo.userName,this.userInfo.pwd).then(res=>{
            this.$router.replace("/");
        }).catch(error=>{

        });
    }

    mounted() {

    }
}