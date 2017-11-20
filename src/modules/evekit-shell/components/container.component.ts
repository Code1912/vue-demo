import { Emit  } from 'vue-property-decorator'
import Component from 'vue-class-component'
import  Vue,{VNode} from 'vue'
@Component({
    template: require('./container.component.html')
})
export   class ContainerComponent  extends Vue {
    vvv:VNode=null;
    name: string;
    searchText:string="";
    // 初始数据可以直接声明为实例的属性
    message: string = 'Hello!';
    userInfo={
        userName:"Test",
        img:""
    }
    name2(){
        return this.name;
    }
    onSearch():void{
        console.log(this.vvv)
     console.log(arguments)
    }
    onLogout(){

    }
    // 组件方法也可以直接声明为实例的方法

    onClick (): void {
        window.alert(this.message);
        //this.$emit()
    }
    beforeRouteEnter () {
        console.log('beforeRouteEnter')
    }

    beforeRouteLeave () {
        console.log('beforeRouteLeave')
    }
}