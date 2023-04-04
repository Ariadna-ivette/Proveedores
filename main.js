import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css' 
import BackButton from "@/components/BackButton.vue";
import VueAxios from "vue-axios";
import { API } from "./services/api";

import './assets/main.css'

const app = createApp(App)
const api = new API();
const axiosPlugin = {
  install(Vue) {
    Vue.prototype.$api = api;
  },
}; 

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueAxios, api);

Vue.component("back-button", BackButton);

new Vue({
  router,
  components: { App },
  render: (h) => h(App)
}).$mount("#app")


app.use(router)

app.mount('#app') 
