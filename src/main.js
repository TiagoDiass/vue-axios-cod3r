import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";

import "./plugins/bootstrap-vue";
import "./plugins/axios";
import "./plugins/sweet-alert";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
