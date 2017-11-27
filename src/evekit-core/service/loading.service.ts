import Vue from 'vue'

const eventName: string = `core.loading`;
import {Injectable} from "../common/injectable";
import {ServiceBase} from "./service.base";
@Injectable()
export class LoadingService  extends  ServiceBase{
    private  _eventBus = new Vue();
    _setLoadingEvent(func: (isShow: boolean) => void): void {
        this._eventBus.$on(eventName, (isShow: boolean) => {
            func(isShow)
        });
    }

     show() {
        this._eventBus.$emit(eventName, true)
    }

     hide() {
        this._eventBus.$emit(eventName, false)
    }
}



