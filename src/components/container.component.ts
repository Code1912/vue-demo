import { Component, Emit, Prop } from 'vue-property-decorator'
import  Vue from 'vue'
@Component({
    template: require('./container.component.html')
})
export default class ContainerComponent  extends Vue {
    @Prop()
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
  alert(1)
    }
    onLogout(){

    }
    // 组件方法也可以直接声明为实例的方法
    @Emit("change")
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