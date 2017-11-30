import {Prop} from 'vue-property-decorator'
import Component from 'vue-class-component'
import Vue, {VNode} from 'vue'
import {Service, EveEventService} from "evekit/core";

export const MenuItemClickEventName: string = "eveMenu.click";

@Component({
    template: require('./menu.component.html'),
    computed: {},
    components: {
        MenuComponent
    }
})
export class MenuComponent extends Vue {
    @Prop({default: 0, type: Number})
    level: number;


    get _ctrlTag(){
        return "MENUITEM";
    }
    @Prop()
    data: MenuItem;

    @Service()
    eventService: EveEventService;

    showChildren(){
        return this.data.active;
    }
    className() {
       return `${this.data.children && this.data.children.length > 0 ? 'treeview' : ''}  ${this.data.active ? 'active' : ''} ${this.data.children && this.$children.length > 0 && this.data.active ? 'menu-open' : ''}`

    }

    onClick() {
        this.data.active = true;
        this.eventService.emit(MenuItemClickEventName,this.level,this)
        // this.eventService.emit(MenuItemClickEventName);
        //   this.checkSelected(this.$parent, this.data.active);
    }

    checkSelected(item: Vue, active: boolean) {
        if (( item.$parent as any)._ctrlTag != 'MENUITEM') {
            return
        }
        let parent = <MenuComponent>item.$parent;
        parent.data.active = active;
        this.checkSelected(parent, active);
    }

    mounted() {
        if (this.$router.currentRoute.path == this.data.path) {
            this.data.active = true;
        }
        this.eventService.on(MenuItemClickEventName, (args:any[]) => {
            let level=args[0];
            let sender=args[1];
            if (level != this.level) {
                return;
            }
            if(this==sender){
                return;
            }
            this.data.active = false;
            this.setChildrenDeactivate(this.$children as MenuComponent[]);
        });
        this.checkSelected(this, this.data.active);
    }

    setChildrenDeactivate(children: MenuComponent[]) {
        (children || []).forEach(p => {
            let child=<MenuComponent>p;
            if(p._ctrlTag!=="MENUITEM"){
                return ;
            }
            p.data.active = false;
            this.setChildrenDeactivate(p.$children as MenuComponent[]);
        })
    }


}

export class MenuItem {
    path: string;
    name: string;
    children?: Array<MenuItem>;
    active?: boolean
}