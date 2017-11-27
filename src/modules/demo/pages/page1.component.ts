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
    tabSelectIndex: number = 0;
    isShown = false;
    code = code;

    created() {

    }

    onHttpGet() {
        HttpService.get('http://www.google.com').then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }

    onModal() {
        this.isShown = !this.isShown
    }

    @ViewChild("fuck")
    btn: HTMLButtonElement;



    addScriptWithContent(content) {
        let js = document.createElement('script');
        js.innerHTML  = content;
        document.body.appendChild(js);
    }
    mounted() {
        console.log(this.btn)
        this.load('http://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js').then(res => {
            return this.load('http://cdn.bootcss.com/highlight.js/9.12.0/languages/typescript.min.js')
        }).then(res => {

              this.addScriptWithContent(`   
                 $(document).ready(()=>{ 
                         $('pre code').each(function(i, block) { 
                            hljs.highlightBlock(block);
                        });
                  })
             `);
        })

    }

    load(url: string): Promise<boolean> {
        let promise = new Promise<boolean>(function (resolve, reject) {
            if ($(`#${url.split("/")[0]}JS`.replace(/\//g, "")).length > 0) {
                resolve(true);
                return;
            }
            let scriptElement: HTMLScriptElement = document.createElement("script");

            scriptElement.src = url;
            scriptElement.id = `${url.split(".")[0]}JS`.replace(/\//g, "");
            scriptElement.type = "text/javascript";
            scriptElement.onload = () => {
                resolve(true)
            };
            scriptElement.addEventListener("error", (ev: ErrorEvent) => {
                console.error(ev);
                reject(false)
            }, true);
            document.body.appendChild(scriptElement);
        });
        promise.catch(res => {
            console.log(res);
        });
        return promise;
    }
}