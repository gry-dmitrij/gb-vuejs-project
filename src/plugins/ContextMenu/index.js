import ContextMenu from "./components/ContextMenu";
export default {
    install(Vue){
        if (this.installed) return;
        this.installed = true;

        Vue.prototype.$contextMenu = {
            EventBus: new Vue(),
            show(settings) {
                this.EventBus.$emit('show', {...settings});
            },
            hide() {
                this.EventBus.$emit('hide');
            },
            click(event, options) {
                this.EventBus.$emit(event, options);
            }
        }

        Vue.component('context-menu', ContextMenu);
    }
}