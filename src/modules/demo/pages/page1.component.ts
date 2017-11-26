import Vue from 'vue'
import {HttpService, ViewChild} from "evekit/core";
import Component from 'vue-class-component'
import {code} from "./code"
declare  const  hljs:any;
@Component({
    template: require('./page1.component.html')
})
export class Page1Component extends Vue {
    haha: string = "hahhaha";
    tabSelectIndex:number=0;
    isShown=false;
    code=code;
    onHttpGet(){
        HttpService.get('http://www.google.com').then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }
    onModal() {
        this.isShown=!this.isShown
    }

    @ViewChild("fuck")
    btn: HTMLButtonElement;

    mounted() {

        console.log(this.btn);
    }
}