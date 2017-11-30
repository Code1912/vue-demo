import Vue from 'vue'
import {EveCookieService, HttpService, ViewChild,Service} from "evekit/core";
import Component from 'vue-class-component'
import {code} from "./code"
declare  const  hljs:any;
@Component({
    template: require('./page1.component.html')
})
export class Page1Component extends Vue {
    haha: string = "hahhaha";
    tabSelectedIndex: number = 0;

    isShown = false;
    chartsOption = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    code = code;
    @Service()
    cookieService:EveCookieService;

    @Service()
    httpService:HttpService;

    checkboxValue:boolean=true;
    onCkValueChange($event){
        console.log(this.checkboxValue)
    }
   beforeMounted(){

   }
    onChangeOptions(){
        this.chartsOption.title.text="ffffffffffff";
        this.chartsOption.series= [{
            name: '销量',
            type: 'bar',
            data: [5, 21, 136, 210, 3, 20]
        }];
        this.chartsOption=Object.assign({},this.chartsOption);

    }

    onHttpGet() {

        this.httpService.get('http://www.google.com').then(res => {
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

    onTabSelectedChange($event){
        console.log($event,this.tabSelectedIndex)
    }
    addScriptWithContent(content) {
        let js = document.createElement('script');
        js.innerHTML  = content;
        document.body.appendChild(js);
    }
    created(){
        console.dir(this.cookieService);

    }
    mounted() {
        console.log(this.cookieService);
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
            if ($(`#${url}`.replace(/\//g, "")).length > 0) {
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