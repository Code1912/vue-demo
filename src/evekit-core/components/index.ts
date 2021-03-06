import {LoadingComponent} from './ui-elements/loading.component'
import {EveModalComponent} from './ui-elements/eve-modal.component'
import {EveTabItemComponent} from "./ui-elements/eve-tab-item.component";
import {EveTabComponent} from "./ui-elements/eve-tab.component";
import {EveCheckboxComponent} from "./forms/eve-checkbox.component";
import {EveChartsComponent} from "./ui-elements/eve-charts.component";


export {
    LoadingComponent,
    EveModalComponent,
    EveTabItemComponent,
    EveTabComponent,
    EveCheckboxComponent,
    EveChartsComponent
}
export const ALL_COMPONENTS = [{
    name: 'eve-loading',
    component: LoadingComponent
    },
    {
        name: 'eve-modal',
        component: EveModalComponent
    },
    {
        name: 'eve-tab',
        component: EveTabComponent
    },
    {
        name: 'eve-tab-item',
        component: EveTabItemComponent
    },
    {
        name: 'eve-checkbox',
        component: EveCheckboxComponent
    },
    {
        name: 'eve-charts',
        component: EveChartsComponent
    }];
