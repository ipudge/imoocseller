import Vue from 'vue';
import App from './App.vue';
import router from './routers';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import './common/stylus/index.styl';

const app = new Vue({
  router,
  ...App
});

app.$mount('#app');
