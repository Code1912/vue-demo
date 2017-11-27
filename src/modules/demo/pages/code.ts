export const code = {
    http: `   
    import Vue from 'vue'
    import {HttpService, ViewChild,Service} from "evekit/core";
    import Component from 'vue-class-component'
    @Component({
        template: \`<button @click='onClick' class='btn btn-primary'>Http Test</button>  \`
    })
    export class Page1Component extends Vue {
        @Service(HttpService)
        httpService:HttpService
        onClick(){
            this.httpService.get('http://www.google.com').then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        }
    } 
    `,
    modal:`    
    import Vue from 'vue' 
    import Component from 'vue-class-component'
    @Component({
        template:\`  <div> <button @click='onOpen' class='btn btn-primary'>OpenModal</button>  
                    <eve-modal v-model:shown="isShown" header="test">
                         <div >fffffffffffffff</div>
                    </eve-modal>
            </div>\`
    })
    export class Page1Component extends Vue {
        isShown=false;
        onOpen(){
             this.isShown=!this.isShown 
        }
    } 
    `,
    tab:`
         
    import Vue from 'vue'
    import {HttpService, ViewChild} from "evekit/core";
    import Component from 'vue-class-component'
    @Component({
        template:\` <eve-tab header="EveTab" vv-model:selected-index='selectedIndex'  v-on:selectedIndexChange="onTabSelectedChange($event)" >
                        <eve-tab-item header="Tab1" :icon="'eye' " >
                             111111
                        </eve-tab-item>
                
                        <eve-tab-item header="Tab2">
                             22222222
                        </eve-tab-item> 
                    </eve-tab>\`
    })
    export class Page1Component extends Vue { 
        selectedIndex=0;
        onTabSelectedChange(val){
             console.log(val)
    } 
    `,
    eveCheckbox:`
         
    import Vue from 'vue'
    import {HttpService, ViewChild} from "evekit/core";
    import Component from 'vue-class-component'
    @Component({
        template:\`  <eve-checkbox v-model:value="checkboxValue" name="ck"  v-on:valueChange="onCkValueChange($event)"  >
                         fffffffffffffff
                    </eve-checkbox>\`
    })
    export class Page1Component extends Vue { 
        checkboxValue:boolean=true;
        onCkValueChange($event){
            console.log(this.checkboxValue)
        }
    } 
    `
}