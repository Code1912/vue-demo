import { Component, Prop } from 'vue-property-decorator'
import  Vue from 'vue'
import "./loading.component.css"
@Component({
    template: require('./loading.component.html')
})
export  class LoadingComponent extends Vue {

    @Prop()
    isShow:boolean=false;


}