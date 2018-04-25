import Vue from 'vue';
import {createDecorator} from 'vue-class-component'

const INJECT: Map<any, any> = new Map();

export function getService(type) {
    if (!INJECT[type]) {
        throw  TypeError(`can't find service ${type.name||type}`)
    }
    return INJECT[type];
}

export function Injectable() {
    return function (target: any) {
        INJECT[target] = new target();
    }
}

export function Service(): PropertyDecorator {
    return function (target: Vue, fieldName: string) {
        //debugger
        // if(target instanceof Vue){
        //     (createDecorator((component, key) => {
        //         let type=Reflect.getMetadata('design:type', target, fieldName);
        //         let service=getService(type);
        //        let options={
        //            type:  type,
        //            default:()=>{
        //                return service;
        //            }
        //        };
        //         // component options should be passed to the callback
        //         // and update for the options object affect the component
        //         component.props =component.props ||{};
        //         component.props [key] = options
        //     }))(target,fieldName);
        //    return ;
        // }
        let service = getService(Reflect.getMetadata('design:type', target, fieldName));
        Object.defineProperty(target, fieldName, {
            get() {
                return service;
            }
        });
    }
}