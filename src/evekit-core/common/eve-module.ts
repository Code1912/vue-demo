import {RouteConfig} from 'vue-router'
export function EveModule (config:{
                               routes:Array<RouteConfig>
                           }){
    return function(target){
        target.routes=config.routes||[];
        return target;
    }
}