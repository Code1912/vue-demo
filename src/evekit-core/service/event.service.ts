import Vue from 'vue'
import {Injectable} from "../common/injectable";

@Injectable()
export class EveEventService  {
    private _eventBus = new Vue();

    public on(event?: string | string[], callback?: Function) {
        this._eventBus.$on(event, callback)
    }

    public emit(eventName: string,...args: any[]) {
        this._eventBus.$emit(eventName,args)
    }

    public once(event?: string  , callback?: Function) {
        this._eventBus.$once(event, callback)
    }

    public off(event?: string | string[], callback?: Function) {
        this._eventBus.$off(event, callback)
    }
}