import Vue from 'vue'

const eventName: string = `core.loading`;

export class LoadingService {
    private static _eventBus = new Vue();

    static _setLoadingEvent(func: (isShow: boolean) => void): void {
        this._eventBus.$on(eventName, (isShow: boolean) => {
            func(isShow)
        });
    }

    static show() {
        this._eventBus.$emit(eventName, true)
    }

    static hide() {
        this._eventBus.$emit(eventName, false)
    }
}



