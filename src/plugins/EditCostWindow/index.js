import EditCostWindow from "./components/EditCostWindow";
export const events = {
    SHOW: 'show',
    HIDE: 'hide',
    ACTION: 'action'
}
export default {
    install(Vue) {
        Vue.prototype.$editCostWindow = {
            EventBus: new Vue(),
            show(settings) {
                this.EventBus.$emit(events.SHOW, {...settings});
            },
            hide() {
                this.EventBus.$emit(events.HIDE);
            },
        }

        Vue.component('edit-cost-window', EditCostWindow);
    }
}