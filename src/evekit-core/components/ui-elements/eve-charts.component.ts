import { Component, Prop ,Watch,Model} from 'vue-property-decorator'
import  Vue from 'vue'
import "./loading.component.css"
import {ViewChild} from "../../common/view-child";
import {Input} from "../../common/input";

@Component({
    template:  `<div :style="{height:height+'px',width:width+'px'}"></div>`
})
export  class EveChartsComponent extends Vue {
    @Input()
    options: any;
    @Input(true)
    height:Number;
    @Input(true)
    width:Number;
    private charts:ECharts;

    @Watch('options')
    onOptionsChanged(newVal:any,oldVal:any){
        if(!this.charts){
            return
        }
        this.charts.setOption(newVal);
    }
    mounted(){
        this.charts = window.echarts.init(this.$el as any);
        if (this.options) {
            this.charts.setOption(this.options );
        }
    }
}