import Vue from 'vue'
import { EveModule} from 'evekit/core';
import {HttpService} from "evekit/core";
import Component from 'vue-class-component'
@Component({
    template:require('./page1.component.html')
})
export class Page1Component extends  Vue{
    onHttpLoading(){
        HttpService.get('http://www.google.com').then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log(error)
        })
    }
}