import { Component, Prop ,Watch,Model} from 'vue-property-decorator'
import  Vue from 'vue'
import "./loading.component.css"
import {ViewChild} from "../../common/view-child";
@Component({
    template: require('./eve-modal.component.html')
})
export  class EveModalComponent extends Vue {
    @Model("shownChange")
    shown:boolean=false;
    @Prop()
    header:string;

    @ViewChild("modal")
    ele:HTMLDivElement;

    onClose(){
        this.$emit("shownChange",false);
    }
    @Watch("shown")
    onShownChanged(newVal:boolean,oldVal:boolean){
        this.showModal(newVal);
    }
    showModal(val:boolean){
        $(this.ele).modal(val?"show":"hide");
    }
}