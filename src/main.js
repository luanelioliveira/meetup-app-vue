import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import colors from 'vuetify/es5/util/colors'
import { store } from './store'
import DateFilter from './filters/date'
import firebase from 'firebase'

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken2,
    accent: colors.red.accent2,
    secondary: colors.grey.lighten1,
    info: colors.blue.lighten1,
    warning: colors.amber.darken2,
    error: colors.red.accent4,
    success: colors.green.lighten2
  }
})

Vue.config.productionTip = false
Vue.filter('date', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyD9ojSX7KPtJiJmeCc-iUs5xxFYzYQt7eQ',
      authDomain: 'meetup-app-e3f0b.firebaseapp.com',
      databaseURL: 'https://meetup-app-e3f0b.firebaseio.com',
      projectId: 'meetup-app-e3f0b',
      storageBucket: 'meetup-app-e3f0b.appspot.com',
      messagingSenderId: '145997471342'
    })
  }
})
