import { Component, Prop ,Model,Watch} from 'vue-property-decorator'
import  Vue from 'vue'
import "./loading.component.css"
import {EveTabItemComponent} from "./eve-tab-item.component";
@Component({
    template: require('./eve-tab.component.html')
})
export  class EveTabComponent extends Vue {
    private  tabItems:EveTabItemComponent[]=[];
    @Prop()
    header:string;
    @Model("selectIndexChange",{
        type:Number,
        default:0
    })
    selectIndex:number ;
    @Watch("selectIndex")
    onSelectIndexChanged(newVal:number,oldVal:number){

        this.selectTab(newVal);
    }
    addTab(tab: EveTabItemComponent) {
        this.tabItems.push(tab);
        this.selectTab(this.selectIndex);
    }

    removeTab(tab: EveTabItemComponent) {
        this.tabItems.removeItem(tab);
        this.selectTab(this.selectIndex);
    }

    onTabTitleClick(index:number){
        this.$emit("selectIndexChange",index);
        this.selectTab(index);
    }
    selectTab(index:number) {
        this.tabItems.forEach((tab,i) => {
            tab.active = index==i;
        });
    }
}