import Vue from "vue";
import ContainerComponent from "./components/container.component";

import Component from  'vue-class-component';
import {Prop} from  'vue-property-decorator';
@Component({
    template: `  <container-component></container-component>  `,
    components: {
        ContainerComponent
    }
})
class  App extends  Vue {

}
new App({
    el: "#app"
});