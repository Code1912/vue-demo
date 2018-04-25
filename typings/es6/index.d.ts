interface  Date{
    addHours(h:number):void;
    addMinutes(m:number):void;
    format(str?:string):string;
}

interface String{
    trim():string;
}

interface Array<T> {
    clear():void;
    removeItem(item:T):void;
    removeByIndex(index:number):void;
    removeAll(fn:(t:T)=>boolean):void;
}
