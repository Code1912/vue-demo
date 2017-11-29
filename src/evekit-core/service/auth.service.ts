import {Injectable} from "../common/injectable";
import {EveCookieService} from "./cookie.service";
import {Service} from "../common/injectable";
import {ServiceBase} from "./service.base";

@Injectable()
export  class EveAuthService  {

    private  _userInfo:{userName:string,img:string};
    @Service()
    cookieService:EveCookieService;
    login(name:string,pwd:string):Promise<boolean>{
        this.cookieService.setCookie("x-token","xxxx");
        this._userInfo={userName:"Admin",img:"https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"};
        return Promise.resolve(true);
    }
    get userInfo(){
        return this._userInfo;
    }
    private _loginByToken(token:string){
        this._userInfo={userName:"Admin",img:"https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"};
        return Promise.resolve();
    }
    authenticate ():Promise<boolean>{
        let token=this.cookieService.getCookie("x-token");
        if(!token){
            return Promise.reject(false);
        }
        return this._loginByToken(token).then(()=>{
            return  Promise.resolve(true);
        })

    }
}