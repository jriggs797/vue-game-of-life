import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStepForward, faPlay, faPause, faRedo, faDice, faCogs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import '@/main.css'

library.add(faStepForward)
library.add(faPlay)
library.add(faPause)
library.add(faRedo)
library.add(faDice)
library.add(faCogs)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
