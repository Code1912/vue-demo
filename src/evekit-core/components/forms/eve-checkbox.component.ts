import { Component, Prop ,Model} from 'vue-property-decorator'
import  Vue from 'vue'
import "./eve-checkbox.component.css"
@Component({
    template: require('./eve-checkbox.component.html')
})
export  class EveCheckboxComponent extends Vue {

    @Prop({
        default:false
    })
    disabled:boolean;
    @Prop()
    text: string;
    @Prop({
        required:true
    })
    name: string;

    @Model("valueChange",{
        type:Boolean,
        default:false
    })
    value:boolean;

    get bindValue(){
        return this.value;
    }
    set bindValue(val){
        this.$emit("valueChange",val);
    }

}