import Vue from 'vue'

const eventName: string = `core.loading`;

export class LoadingService extends Vue {
    _setLoadingEvent(func: (isShow: boolean) => void): void {
        this.$on(eventName, (isShow: boolean) => {
            func(isShow)
        });
    }

    show() {
        this.$emit(eventName, true)
    }

    hide() {
        this.$emit(eventName, false)
    }
}

export const loadingService = new LoadingService();

