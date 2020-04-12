import Vue from 'vue'
import App from './App.vue'
import 'view-design/dist/styles/iview.css'
import ViewDesign from 'view-design'


Vue.config.productionTip = false
Vue.use(ViewDesign)

new Vue({
  render: h => h(App),
}).$mount('#app')
