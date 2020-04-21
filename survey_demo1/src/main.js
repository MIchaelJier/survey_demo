import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { List, Cell , CellGroup, NavBar, Icon, PullRefresh ,Image as VanImage  } from 'vant';
import '@/style/init.scss'
import '@/style/index.scss'

Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(PullRefresh);
Vue.use(VanImage);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
