import Vue from 'vue';
import axios from 'axios';

//axios.defaults.baseURL = 'https://curso-vue-tiago.firebaseio.com/';

Vue.use({
  install(Vue) {
    Vue.prototype.$httpClient = axios.create({
      baseURL: 'https://curso-vue-tiago.firebaseio.com/',
      headers: {
        'Authorization': 'abc123'
      }
    });
  },
});