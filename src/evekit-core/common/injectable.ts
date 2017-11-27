import Vue  from 'vue';
import   { createDecorator } from 'vue-class-component'
const INJECT:Map<any,any>=new Map();
export  function  getService(type){
    if(!INJECT[type]){
         throw  TypeError(`can't find service ${type.name}`)
    }
    return INJECT[type];
}
export function Injectable() {
    return function (target: any) {
        INJECT[target]=new target();
    }
}
export function Service(type:any): PropertyDecorator {
    return function (target: Vue, fieldName) {
        //   debugger
        let service=getService(type);
        Object.defineProperty(target, fieldName, {
            get() {
                return service;
            }
        });
        // let tempFunc=(target['mounted']||Function.prototype);
        //  target['mounted']=function () {
        //     this[fieldName] =  this.$refs[refName];
        //    tempFunc.call(this);
        //  };
    }

}
