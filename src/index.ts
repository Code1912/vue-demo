import Vue from "vue";
import HelloComponent from "./components/Hello";

import Component from  'vue-class-component';
import {Prop} from  'vue-property-decorator';
@Component({
    template: `  <div>
        Name: 
        <h1>Hello Component</h1>
        <hello-component   v-bind:name="name1"  @change="accept"/>  {{name1}}
            </div>
        ` ,
    components: {
        HelloComponent
    }
})
class  App extends  Vue {

    name1: string = " this is my name---";
    accept(){
        this.name1="fffffffffffffffff";
    }
}
new App({
    el: "#app"
});