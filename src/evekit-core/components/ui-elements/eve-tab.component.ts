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
    @Model("selectedIndexChange",{
        type:Number,
        default:0
    })
    selectedIndex:number ;
    @Watch("selectedIndex")
    onSelectIndexChanged(newVal:number,oldVal:number){

        this.selectTab(newVal);
    }
    addTab(tab: EveTabItemComponent) {
        this.tabItems.push(tab);
        this.selectTab(this.selectedIndex);
    }

    removeTab(tab: EveTabItemComponent) {
        this.tabItems.removeItem(tab);
        this.selectTab(this.selectedIndex);
    }

    onTabTitleClick(index:number){
        this.$emit("selectedIndexChange",index);
        this.selectTab(index);
    }
    selectTab(index:number) {
        this.tabItems.forEach((tab,i) => {
            tab.active = index==i;
        });
    }
}