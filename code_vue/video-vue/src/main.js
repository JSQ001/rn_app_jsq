// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(ElementUI)
Vue.use(ant)
Vue.config.productionTip = false

Vue.prototype.$goRoute = function (path) {
  this.$router.push(path)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
