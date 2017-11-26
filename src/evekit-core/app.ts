import './app.css'
export * from "./components/ui-elements";
export * from './service'
export * from './common'

import Vue,{PluginFunction} from 'vue'
import {ALL_COMPONENTS} from "./components/ui-elements";
export  class EvekitCore{
    constructor(options?:any){

    }
    static install(vue: typeof Vue, options):void{
        ALL_COMPONENTS.forEach(p=>{
            vue.component(p.name,p.component)
        });
    }
}