// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from '@/store/'
import Vuetify from 'vuetify'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Vuetify)

/* eslint-disable no-new */
window.fbAsyncInit = () => {
  window.FB.init({
    appId: '680478035496886',
    cookie: true,
    xfbml: true,
    version: 'v2.8'
  })
  window.FB.AppEvents.logPageView()
  console.log('FB Loaded')
  new Vue({
    el: '#app',
    router,
    store,
    created () {
      console.log('Vue Loaded')
    },
    template: '<App/>',
    components: { App }
  })
}
(function (d, s, id) {
  let js = d.getElementsByTagName(s)[0]
  let fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return
  }
  js = d.createElement(s)
  js.id = id
  js.src = '//connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')
