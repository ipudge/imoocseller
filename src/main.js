import Vue from 'vue';
import App from './App.vue';
import router from './routers';
import VueResource from 'vue-resource';
import filters from './filters';

Vue.use(VueResource);
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

import './common/stylus/index.styl';

const app = new Vue({
  router,
  ...App
});

app.$mount('#app');
