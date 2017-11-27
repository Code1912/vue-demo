import './app.css'
export * from "./components";
export * from './service'
export * from './common'
import "./common/es6.extend"
import Vue,{PluginFunction} from 'vue'
import {ALL_COMPONENTS} from "./components";
import  './directive/highlight.directive'
export  class EvekitCore{
    constructor(options?:any){

    }
    static install(vue: typeof Vue, options):void{
        ALL_COMPONENTS.forEach(p=>{
            vue.component(p.name,p.component)
        });
    }
}