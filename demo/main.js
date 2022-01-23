import Vue from 'vue';
import Demo from './demo.vue';
import viewDesign, { Select } from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(viewDesign);

new Vue({
  render: h => h(Demo),
}).$mount('#app');
