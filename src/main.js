import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin, BNavbar } from 'bootstrap-vue'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)

import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-select/dist/vue-select.css';

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