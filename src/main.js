import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from "bootstrap-vue"
import "bootstrap-vue/dist/bootstrap-vue.css"
import store from './store'
import router from './router'
import { firestorePlugin } from 'vuefire'



Vue.use(BootstrapVue)
Vue.use(firestorePlugin)
Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
