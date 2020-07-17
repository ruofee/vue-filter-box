import Vue from 'vue'
import App from './App.vue'
import viewDesign from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(viewDesign)

new Vue({
  render: h => h(App),
}).$mount('#app')
