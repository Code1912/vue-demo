export const code = {
    http: `  
    import Vue from 'vue'
    import {HttpService, ViewChild} from "evekit/core";
    import Component from 'vue-class-component'
    @Component({
        template: require('./page1.component.html')
    })
    export class Page1Component extends Vue {
        onHttpGet(){
            HttpService.get('http://www.google.com').then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        }
    } 
    `,
    modal:`
   
                
    import Vue from 'vue'
    import {HttpService, ViewChild} from "evekit/core";
    import Component from 'vue-class-component'
    @Component({
        template:'  <div> <button @click='onOpen' class='btn btn-primary'>OpenModal</button>  
                    <eve-modal v-model:shown="isShown" header="test">
                         <div >fffffffffffffff</div>
                    </eve-modal>
            </div>'
    })
    export class Page1Component extends Vue {
        isShown=false;
        onOpen(){
             this.isShown=!this.isShown 
        }
    } 
    `
}