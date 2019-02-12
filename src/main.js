// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './routes'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false

window.eventHub = new Vue();

new Vue({
  el: '#app',
  axios,
  router,
  BootstrapVue,
  components: { App },
  template: '<App/>'
})

