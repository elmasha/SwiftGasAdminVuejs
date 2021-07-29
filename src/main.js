import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin, BNavbar } from 'bootstrap-vue'
import { firestorePlugin } from 'vuefire'
import { BProgressBar } from 'bootstrap-vue'
Vue.component('b-progress-bar', BProgressBar)

Vue.use(firestorePlugin)
import KProgress from 'k-progress';
Vue.component('k-progress', KProgress);



import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
 
Vue.use(PerfectScrollbar)
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-select/dist/vue-select.css';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)


// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

Vue.component('b-navbar', BNavbar)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')