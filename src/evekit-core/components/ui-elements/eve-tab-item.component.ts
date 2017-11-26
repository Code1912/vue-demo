import { Component, Prop ,Model} from 'vue-property-decorator'
import  Vue from 'vue'
import "./loading.component.css"
import {EveTabComponent} from "./eve-tab.component";
@Component({
    template: `   <div  :class="active?'tab-pane active':'tab-pane '">
                       <slot></slot>
                    </div>`
})
export  class EveTabItemComponent extends Vue {

    @Prop()
    icon:string;

    @Prop()
    header:string;

    active:boolean=true;

    mounted(){
        this.eveTab.addTab(this);
    }
    get eveTab():EveTabComponent{
        if(!(this.$parent instanceof  EveTabComponent)){
            throw  new Error("eve-tab-item use error,please let in eve-tab")
        }
        return <EveTabComponent>this.$parent
    }
    destoryed(){
        this.eveTab.removeTab(this);
    }
}