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



}
export  class  MenuItem{
    path:string;
    name:string;
    children:Array<MenuItem>
}