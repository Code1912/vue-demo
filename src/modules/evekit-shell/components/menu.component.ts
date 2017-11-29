import { Prop  } from 'vue-property-decorator'
import Component from 'vue-class-component'
import  Vue,{VNode} from 'vue'
@Component({
    template: require('./menu.component.html'),
    components:{
        MenuComponent
    }
})
export   class MenuComponent  extends Vue {
    @Prop()
    data: MenuItem;

    get className(){
        return  `${this.data.children&&this.data.children.length>0?'treeview':''}  ${this.data.active?'active':''}`
    }
    onClick(){

    }

}
export  class  MenuItem{
    path:string;
    name:string;
    children:Array<MenuItem>;
    active?:boolean
}