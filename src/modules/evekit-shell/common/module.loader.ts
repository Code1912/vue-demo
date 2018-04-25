import {ScriptLoader} from "./script.loader";
import {StyleLoader} from "./style.loader";
import {router} from '../app.routing'
import Vue from 'vue'
import Error404Component from "../pages/error404.component";
const  ModuleMap:Map<string,string>  =new Map()
export  class  ModuleLoader{
    static load(path:string):Promise<any>{
        let moduleName=path.split('/')[1];
        if(ModuleMap.has(moduleName)){
            return Promise.resolve(this._findComponentFromCache(moduleName,path)||Error404Component);
        }
        let jsPath=`/modules/${moduleName}/app.js`;
        let cssPath=`/modules/${moduleName}/app.css`;

        let promise=Promise.all([ScriptLoader.load(jsPath),StyleLoader.load(cssPath)]).then(res=>{
            ModuleMap[moduleName]=(window['evekit'][moduleName].App.routes);
            return Promise.resolve(this._findComponentFromCache(moduleName,path)||Error404Component);
        }).catch(error=>{
            return Promise.resolve(Error404Component)
        });
        return promise;
    }

    private  static  _findComponentFromCache(moduleName:string,path:string):any{
        let menu=ModuleMap[moduleName].find(p=>p.path==path);
        if(menu){
            return  menu.component;
        }
        return null;
    }
}