import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from "./store"
import router from './router'

Vue.config.productionTip = false
Vue.use(vuetify)
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
