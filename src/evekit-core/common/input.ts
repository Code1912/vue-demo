import Vue from 'vue';
import {createDecorator} from 'vue-class-component'
export function Input(required?:boolean,defaultValue?:any,type?:any): PropertyDecorator {
    let options={default:defaultValue,required ,type};
    return function (target: Vue, key: string) {
        if (!options.type) {
            options.type = Reflect.getMetadata('design:type', target, key)
        }
        createDecorator((componentOptions, k) => {
            (componentOptions.props || (componentOptions.props = {}) as any)[k] = options
        })(target, key)
    }
}