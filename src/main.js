import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import contextMenu from './plugins/ContextMenu';
import editCostWindow from './plugins/EditCostWindow';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(contextMenu);
Vue.use(editCostWindow);
new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')
