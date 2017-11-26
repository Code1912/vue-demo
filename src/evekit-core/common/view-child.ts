import Vue from 'vue'
export function ViewChild(refName:string) {
    return function (target: Vue, fieldName) {
     //   debugger
        Object.defineProperty(target, fieldName, {
            get() {
                return this.$refs[refName];
            }
        });
        // let tempFunc=(target['mounted']||Function.prototype);
        //  target['mounted']=function () {
        //     this[fieldName] =  this.$refs[refName];
        //    tempFunc.call(this);
        //  };
    }
}