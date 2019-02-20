// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './routes'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import Vue2TouchEvents from 'vue2-touch-events'
import store from './store'
 
Vue.config.productionTip = false

window.eventHub = new Vue();
Vue.use(Vue2TouchEvents)

new Vue({
  el: '#app',
  axios,
  router,
  store,
  BootstrapVue,
  components: { App },
  template: '<App/>'
})

