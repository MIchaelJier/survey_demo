import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/style/init.scss';
import '@/style/index.scss';
import '@/common/rem';

// 引入全局样式
import '@/style/variables.scss';
// vue-function-api & extra
import VueCompositionApi from 'vue-function-api';
import { plugin as extraPlugin } from 'vue-function-api-extra';
Vue.use(VueCompositionApi);
Vue.use(extraPlugin);

// http
import * as api from './request/api';
Vue.prototype.$api = api;

// mock
import '@/mock';

// ECharts
import ECharts from 'vue-echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
Vue.component('echarts', ECharts);

// vant
import {
  List,
  Cell,
  CellGroup,
  NavBar,
  Icon,
  PullRefresh,
  Toast,
  Form,
  Field,
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Rate,
  Picker,
  Popup,
  Search,
  DatetimePicker,
  Tabbar,
  TabbarItem,
  Uploader,
  Switch,
  Collapse,
  CollapseItem,
  Lazyload,
  Image as VanImage
} from 'vant';
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(PullRefresh);
Vue.use(VanImage);
Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Rate);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(DatetimePicker);
Vue.use(Search);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Uploader);
Vue.use(Switch);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Lazyload);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
