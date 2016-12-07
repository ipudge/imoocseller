/**
 * Created by 35781 on 2016/11/28.
 */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import goods from './views/goods.vue';
import ratings from './views/ratings.vue';
import seller from './views/seller.vue';

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller},
    {path: '*', redirect: '/goods'}
  ]
});
