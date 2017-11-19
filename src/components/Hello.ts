import { Component, Emit, Inject, Model, Prop, Provide,  Watch } from 'vue-property-decorator'
import  Vue from 'vue'
@Component({
    template: `<button @click="onClick"> {{name2()}}Click !</button>`

})
export default class HelloComponent  extends Vue {
    @Prop()
    name: string
    // 初始数据可以直接声明为实例的属性
    message: string = 'Hello!';
    name2(){
        return this.name;
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